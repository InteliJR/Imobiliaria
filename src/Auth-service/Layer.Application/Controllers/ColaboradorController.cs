using Layer.Application.Models;
using Layer.Domain.Entities;
using Layer.Domain.Interfaces;
using Layer.Services.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.Security.Claims;
using Layer.Domain.Enums;

namespace Layer.Application.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ColaboradorController : Controller
    {
        private readonly IColaboradorService _colaboradorService;
        private readonly IUserService _userService;

        public ColaboradorController(IColaboradorService colaboradorService, IUserService userService)
        {
            _colaboradorService = colaboradorService;
            _userService = userService;
        }

        [HttpGet("PegarTodosColaboradores")]
        [Authorize(Policy = nameof(Roles.Admin))]
        public async Task<IActionResult> GetAllColaboradores()
        {
            var colaboradores = await _colaboradorService.GetAllColabadores();
            return Ok(colaboradores);
        }

        [HttpGet("PegarColaboradorPorEmail")]
        [Authorize(Policy = "AdminORJudiciario")]
        public async Task<IActionResult> GetColaboradorByEmail([FromQuery] string email)
        {
            var colaborador = await _colaboradorService.GetColaboradorByEmail(email);
            return Ok(colaborador);
        }

        [HttpPost("AdicionarNovoColaborador")]
        [Authorize(Policy = nameof(Roles.Admin))]
        public async Task<IActionResult> AddNewColaborador([FromQuery] [EmailAddress] string email ,[FromBody] NewColaboradorModel newColaborador)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Pegar o userId

            var userID = await _userService.GetUserByEmail(email);

            // Montar o objeto colaborador e adicionar no banco



            var colaborador = new Colaborador
            {
                UsuarioId = userID.UsuarioId,
                NomeCompleto = newColaborador.NomeCompleto,
                TipoColaborador = newColaborador.TipoColaborador
            };

            var colaboradorCreated = await _colaboradorService.InsertNewColaborador(colaborador);
            return Ok(newColaborador);
        }

        [HttpPut("AtualizarColaborador")]
        [Authorize(Policy = "AdminORJudiciario")]
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
        [Authorize(Policy = nameof(Roles.Admin))]
        public async Task<IActionResult> DeleteColaborador([FromQuery] string email)
        {

            await _colaboradorService.DeleteColaborador(email);
            
            return Ok("Colaborador deletado com sucesso.");
        }


        [HttpGet("TokenInformation")]
        [Authorize]
        public async Task<IActionResult> ColaboradroTokenInfo()
        {
            var roleClaim = HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role).Value;

            if (roleClaim != null && (roleClaim == "Admin" || roleClaim == "Judiciario"))
            {
                var colaboradorIdClaim = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "RoleID").Value;

                var colaborador = await _colaboradorService.GetColaboradorByColaboradorID(int.Parse(colaboradorIdClaim));

                return Ok(colaborador);
            }
            else
            {
                return BadRequest("Credenciais incorretas");
            }

        }


    }
}
