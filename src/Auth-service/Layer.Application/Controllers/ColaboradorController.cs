using Layer.Application.Models;
using Layer.Domain.Entities;
using Layer.Domain.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Layer.Application.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ColaboradorController : Controller
    {
        private readonly IColaboradorService _colaboradorService;

        public ColaboradorController(IColaboradorService colaboradorService)
        {
            _colaboradorService = colaboradorService;
        }

        [HttpGet("PegarTodosColaboradores")]
        public async Task<IActionResult> GetAllColaboradores()
        {
            var colaboradores = await _colaboradorService.GetAllColabadores();
            return Ok(colaboradores);
        }

        [HttpGet("PegarColaboradorPorEmail")]
        public async Task<IActionResult> GetColaboradorByEmail([FromQuery] string email)
        {
            var colaborador = await _colaboradorService.GetColaboradorByEmail(email);
            return Ok(colaborador);
        }

        [HttpPost("AdicionarNovoColaborador")]
        public async Task<IActionResult> AddNewColaborador([FromBody] NewColaboradorModel newColaborador)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Montar o objeto colaborador e adicionar no banco

            var colaborador = new Colaborador
            {
                UsuarioId = newColaborador.UsuarioId,
                NomeCompleto = newColaborador.NomeCompleto,
                TipoColaborador = newColaborador.TipoColaborador
            };

            var colaboradorCreated = await _colaboradorService.InsertNewColaborador(colaborador);
            return Ok(newColaborador);
        }

        [HttpPut("AtualizarColaborador")]
        public async Task<IActionResult> UpdateColaborador([FromQuery] string email, [FromBody] UpdateColaboradorModel colaboradorToUpdate)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Pegar o id do colaborador pelo email e atualizar

            var colaborador = await _colaboradorService.GetColaboradorByEmail(email);

            if (colaborador == null)
            {
                return BadRequest("Colaborador não encontrado.");
            }

            if(!string.IsNullOrEmpty(Convert.ToString(colaboradorToUpdate.UsuarioId)))
                colaborador.UsuarioId = colaboradorToUpdate.UsuarioId;
            if(!string.IsNullOrEmpty(colaboradorToUpdate.NomeCompleto))
                colaborador.NomeCompleto = colaboradorToUpdate.NomeCompleto;
            if(!string.IsNullOrEmpty(colaboradorToUpdate.TipoColaborador))
                colaborador.TipoColaborador = colaboradorToUpdate.TipoColaborador;

            var updatedColaborador = await _colaboradorService.UpdateColaborador(colaborador);

            return Ok(updatedColaborador);
        }

        [HttpDelete("DeletarColaborador")]
        public async Task<IActionResult> DeleteColaborador([FromQuery] string email)
        {

            await _colaboradorService.DeleteColaborador(email);
            
            return Ok("Colaborador deletado com sucesso.");
        }


    }
}
