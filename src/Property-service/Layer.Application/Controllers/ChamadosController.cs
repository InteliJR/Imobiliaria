using Layer.Domain.Entites;
using Layer.Domain.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace property_management.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChamadosController : ControllerBase
    {
        private readonly IChamadosRepository _chamadosService;

        public ChamadosController(IChamadosRepository chamadosService)
        {
            _chamadosService = chamadosService;
        }

        [HttpGet("PegarTodosOsChamados")]
        [Authorize(Policy = "AdminORJudiciario")]
        public async Task<ActionResult<IEnumerable<Chamados>>> GetAll()
        {
            var chamados = await _chamadosService.GetAllAsync();
            return Ok(chamados);
        }

        // GET: api/chamados/{id}
        [HttpGet("PegarChamadosPorId/{id}")]
        [Authorize(Policy = "AdminORJudiciario")]
        public async Task<ActionResult<Chamados>> GetById(int id)
        {
            var chamado = await _chamadosService.GetByIdAsync(id);
            if (chamado == null)
            {
                return NotFound();
            }
            return Ok(chamado);
        }

        [HttpPost("CriarUmNovoChamado")]
        [Authorize(Policy = "AdminORLocatario")]
        public async Task<ActionResult<Chamados>> Create(Chamados chamado)
        {
            var newChamado = await _chamadosService.AddAsync(chamado);
            return CreatedAtAction(nameof(GetById), new { id = newChamado.IdChamado }, newChamado);
        }

        // PUT: api/chamados/{id}
        [HttpPut("AtualizarUmChamado/{id}")]
        [Authorize(Policy = "AdminORLocatario")]
        public async Task<IActionResult> Update(int id, Chamados chamado)
        {
            if (id != chamado.IdChamado)
            {
                return BadRequest("ID mismatch.");
            }

            var result = await _chamadosService.UpdateAsync(chamado);
            if (result == 0)
            {
                return NotFound();
            }
            return NoContent();
        }

        // DELETE: api/chamados/{id}
        [HttpDelete("DeletarUmChamado/{id}")]
        [Authorize(Policy = "AdminORLocatario")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _chamadosService.DeleteAsync(id);
            if (result == 0)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}
