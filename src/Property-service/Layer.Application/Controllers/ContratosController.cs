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

        public ContratosController(IContratosRepository contratoService, IimoveisRepository imoveisService, IEmailSender emailSender, ApplicationLog applicationLog)
        {
            _contratoService = contratoService;
            _imoveisService = imoveisService;
            _emailSender = emailSender;
            _applicationLog = applicationLog;
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
        public async Task<IActionResult> UpdateContrato([FromBody] Contratos novocontrato)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var id = novocontrato.ContratoId;

            var contrato = await _contratoService.GetByIdAsync(id);

            if (contrato == null)
            {
                return NotFound();
            }

            // Atualizando os campos do contrato existente com os valores do novo contrato
            contrato.ValorAluguel = novocontrato.ValorAluguel;
            contrato.Iptu = novocontrato.Iptu;
            contrato.TaxaAdm = novocontrato.TaxaAdm;
            contrato.DataInicio = novocontrato.DataInicio;
            contrato.DataEncerramento = novocontrato.DataEncerramento;
            contrato.TipoGarantia = novocontrato.TipoGarantia;
            contrato.CondicoesEspeciais = novocontrato.CondicoesEspeciais;
            contrato.Status = novocontrato.Status;
            contrato.DataPagamento = novocontrato.DataPagamento;
            contrato.DataRescisao = novocontrato.DataRescisao;
            contrato.Renovado = novocontrato.Renovado;
            contrato.DataReajuste = novocontrato.DataReajuste;
            contrato.DataEncerramentoRenovacao = novocontrato.DataEncerramentoRenovacao;
            contrato.ValorReajuste = novocontrato.ValorReajuste;

            // Salvando as alterações no banco de dados
            var result = await _contratoService.UpdateAsync(id, contrato);

            await _applicationLog.LogAsync($"Atualização de contrato com id: {contrato.ContratoId} ", HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value ?? "Email não encontrado", HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role)?.Value ?? "Role não encontrada");

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


    }
}
