using Layer.Domain.Entites;
using Layer.Domain.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Layer.Infrastructure.Database;

namespace property_management.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ChamadosController : ControllerBase
    {
        private readonly IChamadosRepository _chamadosService;
        private readonly ApplicationLog _applicationLog;

        public ChamadosController(IChamadosRepository chamadosService, ApplicationLog applicationLog)
        {
            _chamadosService = chamadosService;
            _applicationLog = applicationLog;
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

            await _applicationLog.LogAsync($"Criação de chamado com id: {newChamado.IdChamado} ", HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value ?? "Email não encontrado", HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role)?.Value ?? "Role não encontrada");

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

            await _applicationLog.LogAsync($"Atualização de chamado com id: {chamado.IdChamado} ", HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value ?? "Email não encontrado", HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role)?.Value ?? "Role não encontrada");

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

            await _applicationLog.LogAsync($"Chamado Deletado com id: {id} ", HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value ?? "Email não encontrado", HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role)?.Value ?? "Role não encontrada");

            return NoContent();
        }
    }
}
