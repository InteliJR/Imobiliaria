using Microsoft.AspNetCore.Mvc;
using Layer.Domain.Interfaces;
using Layer.Application.Models;
using Layer.Domain.Entities;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Layer.Domain.Enums;
using System.IdentityModel.Tokens.Jwt;
using Layer.Infrastructure.Database;

namespace Layer.Application.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class LocadorController : Controller
    {

        private readonly ILocadorService _locadorService;
        private readonly IUserService _userService;
        private readonly ApplicationLog _applicationLog;

        public LocadorController(ILocadorService locadorService, IUserService userService, ApplicationLog applicationLog)
        {
            _locadorService = locadorService;
            _userService = userService;
            _applicationLog = applicationLog;
        }

        [HttpGet("PegarTodosLocadores")]
        [Authorize(Policy = nameof(Roles.Admin))]
        public async Task<IActionResult> GetAllLocadors()
        {
            var locadors = await _locadorService.GetAllLocadorsAsync();
            return Ok(locadors);
        }

        [HttpGet("PegarLocadorPorEmail")]
        [Authorize(Policy = "AdminORLocador")]
        public async Task<IActionResult> GetLocadorByEmail([FromQuery] string email)
        {
            var locador = await _locadorService.GetLocadorByEmail(email);

            if (locador == null) { return BadRequest("Locador não encontrado."); } else { return Ok(locador); }
        }

        [HttpPost("AdicionarNovoLocador")]
        [Authorize(Policy = nameof(Roles.Admin))]
        public async Task<IActionResult> AddNewLocador([Required][EmailAddress] string email, [FromBody] NewLocadorModel locador)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Pegar o id do usuário pelo email e adicionar no locador

            var userID = await _userService.GetUserByEmail(email);

            if (userID == null)
            {
                return BadRequest("Usuário não encontrado.");
            }

            var userAlreadyLinked = await _locadorService.UserAlreadyLinkedLocador(userID.UsuarioId);

            if (userAlreadyLinked)
            {
                return BadRequest("Usuário já está vinculado a um locador.");
            }

            // Montar o objeto Locador
            var locadorNew = new Locador
            {
                UsuarioId = userID.UsuarioId,
                ImovelId = locador.ImovelId,
                PessoaJuridica = false,
                CPF = locador.CPF,
                Nacionalidade = locador.Nacionalidade,
                NumeroTelefone = locador.NumeroTelefone,
                NomeCompletoLocador = locador.NomeCompletoLocador,
                CNPJ = locador.CNPJ,
                Endereco = locador.Endereco,
                Passaporte = locador.Passaporte,
                RG = locador.RG
            };

            var newLocador = await _locadorService.InsertNewLocador(locadorNew);

            await _applicationLog.LogAsync($"Criar Locatario com email {email} ", HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value ?? "Email não encontrado", HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role)?.Value ?? "Role não encontrada");

            return Ok(newLocador);
        }

        [HttpGet("LocadorExiste")]
        [Authorize(Policy = "AdminORLocador")]
        public async Task<IActionResult> LocadorExist([FromQuery] string locadorCPF)
        {
            var locador = await _locadorService.LocadorExist(locadorCPF);
            return Ok(locador);
        }

        [HttpGet("PegarLocadorPorUserId")]
        [Authorize(Policy = "AdminORLocador")]
        public async Task<IActionResult> GetLocadorByUserId([FromQuery] int userId)
        {
            try
            {
                var locador = await _locadorService.GetLocadorByUserId(userId);
                return Ok(locador);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpGet("PegarLocadorPorLocadorID")]
        [Authorize(Policy = "AdminORLocador")]
        public async Task<IActionResult> GetLocadorByLocadorID([FromQuery] int locadorID)
        {
            var locador = await _locadorService.GetLocadorByLocadorID(locadorID);

            if (locador == null) { return BadRequest("Locador não encontrado."); } else { return Ok(locador); }
        }

        [HttpPost("AtualizarLocador")]
        [Authorize(Policy = "AdminORLocador")]
        public async Task<IActionResult> UpdateLocador([FromBody] UpdateLocadorModel locadorToUpdate)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (locadorToUpdate == null)
            {
                return BadRequest("Locador não encontrado.");
            }

            var userID = new User();

            var email = HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value?? throw new ArgumentNullException("Email não encontrado.");

            userID = await _userService.GetUserByEmail(email);

            Console.WriteLine(userID);

            if (userID == null)
            {
                return BadRequest("Usuário não encontrado.");
            }

            var locador = await _locadorService.GetLocadorByUserId(userID.UsuarioId);

            // Atualizar apenas os campos que foram preenchidos

            if (!string.IsNullOrEmpty(locadorToUpdate.CPF))
                locador.CPF = locadorToUpdate.CPF;
            if (!string.IsNullOrEmpty(locadorToUpdate.Nacionalidade))
                locador.Nacionalidade = locadorToUpdate.Nacionalidade;
            if (!string.IsNullOrEmpty(locadorToUpdate.NumeroTelefone))
                locador.NumeroTelefone = locadorToUpdate.NumeroTelefone;
            if (!string.IsNullOrEmpty(locadorToUpdate.NomeCompletoLocador))
                locador.NomeCompletoLocador = locadorToUpdate.NomeCompletoLocador;
            if (!string.IsNullOrEmpty(locadorToUpdate.CNPJ))
                locador.CNPJ = locadorToUpdate.CNPJ;
            if (!string.IsNullOrEmpty(locadorToUpdate.Endereco))
                locador.Endereco = locadorToUpdate.Endereco;
            if (!string.IsNullOrEmpty(locadorToUpdate.Passaporte))
                locador.Passaporte = locadorToUpdate.Passaporte;
            if (!string.IsNullOrEmpty(locadorToUpdate.RG))
                locador.RG = locadorToUpdate.RG;

            var updatedLocador = await _locadorService.UpdateLocador(locador);

            await _applicationLog.LogAsync($"Atualizar Locador com email {email} ", HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value ?? "Email não encontrado", HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role)?.Value ?? "Role não encontrada");

            return Ok(updatedLocador);
        }

        [HttpDelete("DeletarLocador")]
        [Authorize(Policy = nameof(Roles.Admin))]
        public async Task<IActionResult> DeleteLocador([FromBody] string CPF)
        {
            var locador = await _locadorService.DeleteLocador(CPF);

            await _applicationLog.LogAsync($"Deletar Locador com CPF {CPF} ", HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value ?? "Email não encontrado", HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role)?.Value ?? "Role não encontrada");

            return Ok(locador);
        }

        [HttpGet("TokenInformation")]
        [Authorize(Policy = "AdminORLocador")]
        public async Task<IActionResult> LocadorTokenInfo()
        {
            var roleClaim = HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role).Value;

            if (roleClaim != null && roleClaim == "Locador")
            {
                var locadorIdClaim = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "RoleID").Value;

                var locador = await _locadorService.GetLocadorByLocadorID(int.Parse(locadorIdClaim));

                return Ok(locador);
            }
            else
            {
                return BadRequest("Credenciais incorretas");
            }

        }

    }
}