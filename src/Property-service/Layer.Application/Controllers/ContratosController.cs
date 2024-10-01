using Layer.Domain.Entites;
using Layer.Domain.Interfaces;
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

        public ContratosController(IContratosRepository contratoService)
        {
            _contratoService = contratoService;
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

        [HttpPost]
        public async Task<IActionResult> AddContrato([FromBody] NewContratos newContratos)
        {
            throw new NotImplementedException();
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
