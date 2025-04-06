using Layer.Domain.Entites;
using Layer.Domain.Enums;
using Layer.Domain.Interfaces;
using Layer.Services.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using property_management.Models;
using System.Security.Claims;
using Layer.Infrastructure.Database;
using System.Security.Principal;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Layer.Infrastructure.ExternalAPIs;

namespace property_management.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ContratosController : Controller
    {
        private readonly IContratosRepository _contratoService;
        private readonly IimoveisRepository _imoveisService;
        private readonly IEmailSender _emailSender;
        private readonly ApplicationLog _applicationLog;
        private readonly IUsersAPI _usersAPI;

        public ContratosController(IContratosRepository contratoService, IimoveisRepository imoveisService, IEmailSender emailSender, ApplicationLog applicationLog, IUsersAPI usersAPI)
        {
            _contratoService = contratoService;
            _imoveisService = imoveisService;
            _emailSender = emailSender;
            _applicationLog = applicationLog;
            _usersAPI = usersAPI;
        }

        [HttpGet("PegarContratoPorId/{id}")]
        [Authorize(Policy = "AdminORJudiciario")]
        public async Task<IActionResult> GetContrato(int id)
        {
            var contrato = await _contratoService.GetByIdAsync(id);
            if (contrato == null)
            {
                return NotFound();
            }
            return Ok(contrato);
        }

        [HttpGet("PegarTodosOsContratos")]
        [Authorize(Policy = "AdminORJudiciario")]
        public async Task<IActionResult> GetAllContratos()
        {
            var contratos = await _contratoService.GetAllAsync();
            return Ok(contratos);
        }

        [HttpPost("CriarContratoComMultiplosArquivos")]
        [Authorize(Policy = nameof(Roles.Admin))]
        public async Task<IActionResult> AddContratoWithMultipleFiles([FromForm] NewContratos newContrato, IFormFileCollection files, string? emailLocador, string? emailLocatario)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var contrato = new Contratos
            {
                LocadorId = newContrato.LocadorId,
                LocatarioId = newContrato.LocatarioId,
                ImovelId = newContrato.ImovelId,
                ValorAluguel = newContrato.ValorAluguel,
                Iptu = newContrato.Iptu,
                TaxaAdm = newContrato.TaxaAdm,
                DataInicio = newContrato.DataInicio,
                DataEncerramento = newContrato.DataEncerramento,
                TipoGarantia = newContrato.TipoGarantia,
                CondicoesEspeciais = newContrato.CondicoesEspeciais,
                Status = newContrato.Status,
                DataPagamento = newContrato.DataPagamento,
                DataRescisao = newContrato.DataRescisao,
                Renovado = newContrato.Renovado,
                DataEncerramentoRenovacao = newContrato.DataEncerramentoRenovacao,
                DataReajuste = newContrato.DataReajuste,
                ValorReajuste = newContrato.ValorReajuste
            };

            var novoContrato = await _contratoService.AddAsyncWithMultipleFiles(contrato, files);

            string contractDetails = $"Contrato ID: {novoContrato.ContratoId}, Valor do Aluguel: {novoContrato.ValorAluguel}, Início: {novoContrato.DataInicio}, Término do contrato: {novoContrato.DataEncerramento}";
            
            if (!string.IsNullOrEmpty(emailLocador))
            {
                string locadorUserType = "Locador";

                await _emailSender.SendEmailAsync(emailLocador, locadorUserType, contractDetails);
            }


            if (!string.IsNullOrEmpty(emailLocatario)) 
            {
                string locatarioUserType = "Locatário";

                await _emailSender.SendEmailAsync(emailLocatario, locatarioUserType, contractDetails);
            }

            // await _applicationLog.LogAsync($"Criação de contrato com id: {novoContrato.ContratoId} ", HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value ?? "Email não encontrado", HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role)?.Value ?? "Role não encontrada");

            return Ok(novoContrato);
        }

        [HttpPut("AtualizarContrato/{id}")]
        [Authorize(Policy = nameof(Roles.Admin))]
        public async Task<IActionResult> UpdateContrato(int id, [FromBody] UpdateContrato contratoDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var contrato = await _contratoService.GetByIdAsync(id);
            
            if (contrato == null)
            {
                return NotFound();
            }

            // Atualizando apenas os campos fornecidos
            if (contratoDto.ValorAluguel.HasValue) contrato.ValorAluguel = contratoDto.ValorAluguel.Value;
            if (contratoDto.Iptu.HasValue) contrato.Iptu = contratoDto.Iptu.Value;
            if (contratoDto.TaxaAdm.HasValue) contrato.TaxaAdm = contratoDto.TaxaAdm.Value;
            if (contratoDto.DataInicio.HasValue) contrato.DataInicio = contratoDto.DataInicio.Value;
            if (contratoDto.DataEncerramento.HasValue) contrato.DataEncerramento = contratoDto.DataEncerramento.Value;
            if (!string.IsNullOrEmpty(contratoDto.TipoGarantia)) contrato.TipoGarantia = contratoDto.TipoGarantia;
            if (!string.IsNullOrEmpty(contratoDto.CondicoesEspeciais)) contrato.CondicoesEspeciais = contratoDto.CondicoesEspeciais;
            if (!string.IsNullOrEmpty(contratoDto.Status)) contrato.Status = contratoDto.Status;
            if (contratoDto.DataPagamento.HasValue) contrato.DataPagamento = contratoDto.DataPagamento.Value;
            if (contratoDto.DataRescisao.HasValue) contrato.DataRescisao = contratoDto.DataRescisao.Value;
            if (contratoDto.Renovado.HasValue) contrato.Renovado = contratoDto.Renovado.Value;
            if (contratoDto.DataReajuste.HasValue) contrato.DataReajuste = contratoDto.DataReajuste.Value;
            if (contratoDto.DataEncerramentoRenovacao.HasValue) contrato.DataEncerramentoRenovacao = contratoDto.DataEncerramentoRenovacao.Value;
            if (contratoDto.ValorReajuste.HasValue) contrato.ValorReajuste = contratoDto.ValorReajuste.Value;

            // Salvando as alterações no banco de dados
            var result = await _contratoService.UpdateAsync(id, contrato);

            await _applicationLog.LogAsync($"Atualização de contrato com id: {contrato.ContratoId}",
                HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value ?? "Email não encontrado",
                HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role)?.Value ?? "Role não encontrada");

            return Ok(contrato);
        }

        [HttpDelete("DeletarContrato/{id}")]
        [Authorize(Policy = nameof(Roles.Admin))]
        public async Task<IActionResult> DeleteContrato(int id)
        {
            throw new NotImplementedException();
        }

        [HttpPost("AssinarPdfs")]
        [Authorize (Policy = "AllRoles")]
        public async Task<IActionResult> GenerateSignedUrlOfPdfs(List<string> idImages)
        {
            var urls = await _contratoService.GenerateSignedUrlsOfPdfsAsync(idImages);
            return Ok(urls);
        }

        [HttpGet("PegarContratoPorImovelIdComVerificacao/{imovelId}")]
        [Authorize(Policy = "AllRoles")]
        public async Task<IActionResult> GetContratoByImovelIdWithVerification(int imovelId)
        {
            // Obter o RoleID do usuário logado
            var roleId = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "RoleID")?.Value;
            if (string.IsNullOrEmpty(roleId))
            {
                return Unauthorized("RoleID do usuário não encontrado.");
            }

            // Obter o papel do usuário logado (Locatário ou Locador)
            var userRole = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "http://schemas.microsoft.com/ws/2008/06/identity/claims/role")?.Value;
            if (string.IsNullOrEmpty(userRole))
            {
                return Unauthorized("Papel do usuário não definido.");
            }

            // Permitir acesso apenas se o papel for Locador ou Locatário
            if (userRole != nameof(Roles.Locador) && userRole != nameof(Roles.Locatario))
            {
                return Forbid("Acesso negado: apenas Locador ou Locatário têm permissão.");
            }

            // Buscar o contrato pelo ImovelId
            var contrato = await _contratoService.GetContratoAtivoPorImovelIdAsync(imovelId);

            if (contrato == null)
            {
                return NotFound($"Nenhum contrato ativo encontrado para o Imóvel com ID {imovelId}.");
            }

            // Verificação de permissão baseada no papel
            if (userRole == nameof(Roles.Locador) && contrato.LocadorId.ToString() != roleId)
            {
                return Unauthorized("Acesso negado: você não é o locador deste imóvel.");
            }

            if (userRole == nameof(Roles.Locatario) && contrato.LocatarioId.ToString() != roleId)
            {
                return Unauthorized("Acesso negado: você não é o locatário deste imóvel.");
            }

            return Ok(contrato);
        }




        [HttpPost("Enviar-Notificacao-Reajuste")]
        [Authorize(Policy = nameof(Roles.Admin))]
        public async Task<IActionResult> EnviarNotificacaoReajuste()
        {
            try
            {
                // Obtém contratos que estão próximos da data de reajuste
                var contratosParaReajuste = await _contratoService.ObterContratosProximosReajusteAsync();

                if (!contratosParaReajuste.Any())
                {
                    return NotFound("Nenhum contrato próximo do reajuste foi encontrado.");
                }

                List<string> emailsNotificados = new();

                foreach (var contrato in contratosParaReajuste)
                {
                    // Obtém informações do locatário usando o serviço de autenticação
                    var locatarioInfo = await GetUserInfo(contrato.LocatarioId.ToString(), "Locatario");

                    if (locatarioInfo == null || string.IsNullOrEmpty(locatarioInfo.Email))
                    {
                        Console.WriteLine($"Não foi possível obter informações do locatário {contrato.LocatarioId}.");
                        continue;
                    }

                    var email = locatarioInfo.Email;
                    var assunto = "Aviso de Reajuste de Contrato";
                    var mensagem = $"Olá {locatarioInfo.Nome}, seu contrato de aluguel será reajustado em {contrato.DataReajuste:dd/MM/yyyy}.";

                    // Envia o e-mail de notificação
                    var resultadoEnvio = await _emailSender.SendEmailAsync(email, assunto, mensagem);

                    if (resultadoEnvio.StartsWith("E-mail enviado com sucesso!", StringComparison.OrdinalIgnoreCase)) 
                    {
                        emailsNotificados.Add(email);
                    }

                }

                return Ok(new { Mensagem = "Notificações enviadas com sucesso.", Emails = emailsNotificados });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro ao enviar notificações: {ex.Message}");
            }
        }

        // Método para obter informações do usuário no Auth-Service
        private async Task<UserInfo> GetUserInfo(string userId, string role)
        {
            var endpoint = role switch
            {
                "Locador" => $"/User/infoLocador/{userId}",
                "Locatario" => $"/User/infoLocatario/{userId}",
                _ => null
            };

            if (endpoint == null)
                return null;

            try
            {
                // Faz a requisição ao serviço de usuários
                var response = await _usersAPI.SendHMACRequestQueryAsync(endpoint, userId);

                // Desserializa o JSON na classe UserInfo
                return JsonConvert.DeserializeObject<UserInfo>(response);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao buscar informações do usuário: {ex.Message}");
                return null;
            }
        }

        [HttpDelete("DeletarDocumento/{contractId}")]
        [Authorize(Policy = nameof(Roles.Admin))]
        public async Task<IActionResult> DeleteDocument(int contractId, [FromQuery] string documentUrl)
        {
            if (string.IsNullOrEmpty(documentUrl))
            {
                return BadRequest("URL do documento é obrigatória.");
            }

            var result = await _contratoService.DeleteDocumentFromContractAsync(contractId, documentUrl);
            
            if (!result)
            {
                return NotFound("Contrato não encontrado.");
            }

            return Ok("Documento removido com sucesso.");
        }

    }
}
