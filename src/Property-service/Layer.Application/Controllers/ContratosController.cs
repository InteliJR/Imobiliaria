using Layer.Domain.Entites;
using Layer.Domain.Interfaces;
using Layer.Services.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using property_management.Models;

//TODO:
    //Para a criação de um contrato, precisamos criar uma rota conectada ao firebase para enviar arquivos que estão relacionados a esse contrato e inserir alguma coisa que relacione esse documento a determinado contrato

namespace property_management.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ContratosController : Controller
    {
        private readonly IContratosRepository _contratoService;
        private readonly IimoveisRepository _imoveisService;

        public ContratosController(IContratosRepository contratoService, IimoveisRepository imoveisService)
        {
            _contratoService = contratoService;
            _imoveisService = imoveisService;
        }

        [HttpGet("PegarContratoPorId/{id}")]
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
        public async Task<IActionResult> GetAllContratos()
        {
            var contratos = await _contratoService.GetAllAsync();
            return Ok(contratos);
        }

        [HttpPost("CriarUmNovoContrato")]
        public async Task<IActionResult> AddContrato([FromForm] NewContratos newContrato, IFormFile file)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Verificar se o LocadorId existe
            //var locadorExists = await _locadoresService.LocadorExistsAsync(newContrato.LocadorId);
            //if (!locadorExists)
            //{
            //    return NotFound(new { Message = $"Locador com ID {newContrato.LocadorId} não encontrado." });
            //}

            // Verificar se o LocatarioId existe
            //var locatarioExists = await _locatariosService.LocatarioExistsAsync(newContrato.LocatarioId);
            //if (!locatarioExists)
            //{
            //    return NotFound(new { Message = $"Locatário com ID {newContrato.LocatarioId} não encontrado." });
            //}

            //// Verificar se o ImovelId existe
            //var imovelExists = await _imoveisService.GetByIdImoveisAsync(newContrato.ImovelId);
            //if (!imovelExists)
            //{
            //    return NotFound(new { Message = $"Imóvel com ID {newContrato.ImovelId} não encontrado." });
            //}

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
                ValorReajuste = newContrato.ValorReajuste
            };

            var novoContrato = await _contratoService.AddAsync(contrato, file);
            return Ok(novoContrato);
        }

        [HttpPut("AtualizarContrato/{id}")]
        public async Task<IActionResult> UpdateContrato(int id, [FromBody] Contratos novocontrato)
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

            // Atualizando os campos do contrato existente com os valores do novo contrato
            contrato.LocadorId = novocontrato.LocadorId;
            contrato.LocatarioId = novocontrato.LocatarioId;
            contrato.ImovelId = novocontrato.ImovelId;
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
            contrato.DataEncerramentoRenovacao = novocontrato.DataEncerramentoRenovacao;
            contrato.ValorReajuste = novocontrato.ValorReajuste;

            // Salvando as alterações no banco de dados
            var result = await _contratoService.UpdateAsync(id, contrato);

            //if (result == false)
            //{
            //    return StatusCode(StatusCodes.Status500InternalServerError, "Erro ao atualizar o contrato");
            //}

            return Ok(contrato);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContrato(int id)
        {
            throw new NotImplementedException();
        }

    }
}
