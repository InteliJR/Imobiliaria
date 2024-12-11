using Layer.Domain.Entites;
using Layer.Domain.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Layer.Infrastructure.Database;
using property_management.Models;

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

        // GET: api/chamados/imovel/{imovelId}
        [HttpGet("PegarChamadosPorImovel/{imovelId}")]
        [Authorize(Policy = "AdminORJudiciario")]
        public async Task<ActionResult<IEnumerable<Chamados>>> GetByImovelId(int imovelId)
        {
            var chamados = await _chamadosService.GetByImovelIdAsync(imovelId);
            if (chamados == null || !chamados.Any())
            {
                return NotFound();
            }
            return Ok(chamados);
        }

        [HttpPost("CriarUmNovoChamado")]
        [Authorize(Policy = "AdminORLocatario")]
        public async Task<ActionResult<NewChamado>> Create(NewChamado newChamado)
        {
            newChamado.DataSolicitacao = newChamado.DataSolicitacao.ToUniversalTime();

            // if (chamado.DataInicio.HasValue)
            // {
            //   chamado.DataInicio = chamado.DataInicio.Value.ToUniversalTime();
            // }

            // if (chamado.DataFim.HasValue)
            // {
            //   chamado.DataFim = chamado.DataFim.Value.ToUniversalTime();
            // }

            // Montar o objeto chamado
            var chamado = new Chamados
            {
                Titulo = newChamado.Titulo,
                SolicitanteId = newChamado.SolicitanteId,
                DataSolicitacao = newChamado.DataSolicitacao,
                DataInicio = null,
                DataFim = null,
                Descricao = newChamado.Descricao,
                TipoChamado = newChamado.TipoChamado,
                Status = newChamado.Status,
                IdImovel = newChamado.IdImovel // Atribuindo o IdImovel do NewChamado
            };

            var createdChamado = await _chamadosService.AddAsync(chamado);

            await _applicationLog.LogAsync($"Criação de chamado com id: {createdChamado.IdChamado} ", HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value ?? "Email não encontrado", HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role)?.Value ?? "Role não encontrada");

            return CreatedAtAction(nameof(GetById), new { id = createdChamado.IdChamado }, createdChamado);
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
        // PUT: api/chamados/imovel/{imovelId}
        [HttpPut("AtualizarChamadoPorImovel/{imovelId}")]
        [Authorize(Policy = "AdminORLocatario")]
        public async Task<IActionResult> UpdateByImovelId(int imovelId, Chamados chamado)
        {
            if (imovelId != chamado.IdImovel)
            {
                return BadRequest("ID do imóvel não corresponde.");
            }

            var chamadoExistente = await _chamadosService.GetByImovelIdAsync(imovelId);
            if (chamadoExistente == null || !chamadoExistente.Any())
            {
                return NotFound("Nenhum chamado encontrado para este imóvel.");
            }

            var result = await _chamadosService.UpdateAsync(chamado);
            if (result == 0)
            {
                return NotFound("Erro ao atualizar o chamado.");
            }

            await _applicationLog.LogAsync(
                $"Atualização de chamado associado ao imóvel com id: {imovelId}", 
                HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value ?? "Email não encontrado", 
                HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role)?.Value ?? "Role não encontrada"
            );

            return NoContent();
        }

        // DELETE: api/chamados/imovel/{imovelId}
        [HttpDelete("DeletarChamadoPorImovel/{imovelId}")]
        [Authorize(Policy = "AdminORLocatario")]
        public async Task<IActionResult> DeleteByImovelId(int imovelId)
        {
            var chamados = await _chamadosService.GetByImovelIdAsync(imovelId);
            if (chamados == null || !chamados.Any())
            {
                return NotFound("Nenhum chamado encontrado para este imóvel.");
            }

            var result = await _chamadosService.DeleteByImovelIdAsync(imovelId);
            if (result == 0)
            {
                return NotFound("Erro ao deletar o chamado.");
            }

            await _applicationLog.LogAsync(
                $"Chamado deletado associado ao imóvel com id: {imovelId}", 
                HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value ?? "Email não encontrado", 
                HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role)?.Value ?? "Role não encontrada"
            );

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
