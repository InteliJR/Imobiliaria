using Layer.Domain.Entites;
using Layer.Domain.Interfaces;
using Layer.Services.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using property_management.Models;

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
        public async Task<IActionResult> AddContrato([FromBody] NewContratos newContrato)
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

            var novoContrato = await _contratoService.AddAsync(contrato);
            return Ok(novoContrato);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateContrato(int id, [FromBody] Contratos contrato)
        {
            throw new NotImplementedException();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContrato(int id)
        {
            throw new NotImplementedException();
        }

    }
}
