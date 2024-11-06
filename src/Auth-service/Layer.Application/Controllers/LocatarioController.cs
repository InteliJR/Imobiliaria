using Microsoft.AspNetCore.Mvc;
using Layer.Domain.Interfaces;
using Layer.Application.Models;
using Layer.Domain.Entities;
using System.ComponentModel.DataAnnotations;
using Layer.Services.Services;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Layer.Domain.Enums;
using Layer.Infrastructure.Database;
using Microsoft.AspNetCore.Authorization;
using Layer.Domain.Enums;
using System.ComponentModel.DataAnnotations;
using Layer.Infrastructure.Database;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;



namespace Layer.Application.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class LocatarioController : Controller
    {

        private readonly ILocatarioService _locatarioService;
        private readonly IUserService _userService;
        private readonly ApplicationLog _applicationLog;

        public LocatarioController(ILocatarioService LocatarioService, IUserService userService, ApplicationLog applicationLog)
        {
            _locatarioService = LocatarioService;
            _userService = userService;
            _applicationLog = applicationLog;
        }

        [HttpGet("PegarTodosLocatarios")]
        [Authorize(Policy = nameof(Roles.Admin))]
        public async Task<IActionResult> GetAllLocatarios()
        {
            var locatarios = await _locatarioService.GetAllLocatariosAsync();
            return Ok(locatarios);
        }

        [HttpGet("PegarLocatarioPorEmail")]
        [Authorize(Policy = "AdminORLocatario")]
        public async Task<IActionResult> GetLocatarioByEmail([FromQuery] string email)
        {
            var locatario = await _locatarioService.GetLocatarioByEmail(email);
            return Ok(locatario);
        }

        [HttpPost("AdicionarNovoLocatario")]
        [Authorize(Policy = nameof(Roles.Admin))]
        public async Task<IActionResult> AddNewLocatario([Required] [EmailAddress] string email, [FromBody] NewLocatarioModel locatario)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Pegar o id do usuário pelo email e adicionar no Locatario

            var userID = await _userService.GetUserByEmail(email);

            if (userID == null)
            {
                return BadRequest("Usuário não encontrado.");
            }

            var userAlreadyLinked = await _locatarioService.UserAlreadyLinkedLocatario(userID.UsuarioId);

            if (userAlreadyLinked)
            {
                return BadRequest("Usuário já está vinculado a um Locatario.");
            }

            // Montar o objeto Locatario
            var locatarioNew = new Locatario
            {
                UsuarioId = userID.UsuarioId,
                ImovelId = locatario.ImovelId,
                CPF = locatario.CPF,
                Nacionalidade = locatario.Nacionalidade,
                NumeroTelefone = locatario.NumeroTelefone,
                NomeCompletoLocatario = locatario.NomeCompletoLocatario,
                CNPJ = locatario.CNPJ,
                Endereco = locatario.Endereco,
                Passaporte = locatario.Passaporte,
                RG = locatario.RG
            };

            var newLocatario = await _locatarioService.InsertNewLocatario(locatarioNew);

            await _applicationLog.LogAsync($"Criação de Locatario com {email} ", HttpContext.User.Claims.FirstOrDefault(x => x.Type == JwtRegisteredClaimNames.Sub)?.Value ?? "Email não encontrado", HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role)?.Value ?? "Role não encontrada");


            return Ok(newLocatario);
        }

        [HttpGet("LocatarioExiste")]
        [Authorize(Policy = "AdminORLocatario")]
        public async Task<IActionResult> LocatarioExist([FromQuery] string LocatarioCPF)
        {
            var locatario = await _locatarioService.LocatarioExist(LocatarioCPF);
            return Ok(locatario);
        }

        [HttpGet("PegarLocatarioPorUserId")]
        [Authorize(Policy = "AdminORLocatario")]
        public async Task<IActionResult> GetLocatarioByUserId([FromQuery] int userId)
        {
            var locatario = await _locatarioService.GetLocatarioByUserId(userId);
            return Ok(locatario);
        }

        [HttpGet("PegarLocatarioPorLocatarioID")]
        [Authorize (Policy = "AdminORLocatario")]
        public async Task<IActionResult> GetLocatarioByLocatarioID([FromQuery] int LocatarioID)
        {
            var locatario = await _locatarioService.GetLocatarioByLocatarioID(LocatarioID);
            return Ok(locatario);
        }

        [HttpPost("AtualizarLocatario")]
        [Authorize (Policy = "AdminORLocatario")]
        public async Task<IActionResult> UpdateLocatario(string CPF, [FromBody] UpdateLocatarioModel LocatarioToUpdate)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (LocatarioToUpdate == null)
            {
                return BadRequest("Locatario não encontrado.");
            }

            var userID = await _userService.GetUserByCPF(CPF);

            if (userID == null)
            {
                return BadRequest("Usuário não encontrado.");
            }

            var locatario = await _locatarioService.GetLocatarioByUserId(userID.UsuarioId);

            // Atualizar apenas os campos que foram preenchidos

            if (!string.IsNullOrEmpty(LocatarioToUpdate.CPF))
                locatario.CPF = LocatarioToUpdate.CPF;
            if(!string.IsNullOrEmpty(LocatarioToUpdate.Nacionalidade))
                locatario.Nacionalidade = LocatarioToUpdate.Nacionalidade;
            if(!string.IsNullOrEmpty(LocatarioToUpdate.NumeroTelefone))
                locatario.NumeroTelefone = LocatarioToUpdate.NumeroTelefone;
            if(!string.IsNullOrEmpty(LocatarioToUpdate.NomeCompletoLocatario))
                locatario.NomeCompletoLocatario = LocatarioToUpdate.NomeCompletoLocatario;
            if(!string.IsNullOrEmpty(LocatarioToUpdate.Endereco))
                locatario.Endereco = LocatarioToUpdate.Endereco;
            if(!string.IsNullOrEmpty(LocatarioToUpdate.Passaporte))
                locatario.Passaporte = LocatarioToUpdate.Passaporte;
            if(!string.IsNullOrEmpty(LocatarioToUpdate.RG))
                locatario.RG = LocatarioToUpdate.RG;

            var updatedLocatario = await _locatarioService.UpdateLocatario(locatario);

            await _applicationLog.LogAsync($"Atualização de Locatario com CPF {CPF}", HttpContext.User.Claims.FirstOrDefault(x => x.Type == JwtRegisteredClaimNames.Sub)?.Value ?? "Email não encontrado", HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role)?.Value ?? "Role não encontrada");

            return Ok(updatedLocatario);
        }

        [HttpDelete("DeletarLocatario")]
        [Authorize(Policy = nameof(Roles.Admin))]
        public async Task<IActionResult> DeleteLocatario([FromBody] string CPF)
        {
            var locatario = await _locatarioService.DeleteLocatario(CPF);
            await _applicationLog.LogAsync($"Deletar locatario com CPF {CPF} ", HttpContext.User.Claims.FirstOrDefault(x => x.Type == JwtRegisteredClaimNames.Sub)?.Value ?? "Email não encontrado", HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role)?.Value ?? "Role não encontrada");
            return Ok(locatario);
        }

        [HttpGet("TokenInformation")]
        [Authorize(Policy = "AdminORLocatario")]
        public async Task<IActionResult> LocatarioTokenInfo()
        {
            var roleClaim = HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role).Value;

            if (roleClaim != null && roleClaim == "Locatario")
            {
                var locatarioIdClaim = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "RoleID").Value;

                var locatario = await _locatarioService.GetLocatarioByLocatarioID(int.Parse(locatarioIdClaim));

                return Ok(locatario);
            }
            else
            {
                return BadRequest("Credenciais incorretas");
            }

        }

    }
}
