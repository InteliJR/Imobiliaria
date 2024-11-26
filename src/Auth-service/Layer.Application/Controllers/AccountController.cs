using Layer.Domain.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Layer.Domain.Enums;
using Layer.Application.Models;


namespace Layer.Application.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AccountController : Controller
    {

        private readonly ITokenService _tokenService;
        private readonly IUserService _userService;
        private readonly IHashingPasswordService _hashingPasswordService;
        private readonly ILocadorService _locadorService;
        private readonly ILocatarioService _locatarioService;
        private readonly IColaboradorService _colaboradorService;

        public AccountController(ITokenService tokenService, IUserService userService, IHashingPasswordService hashingPasswordService, ILocadorService locadorService, ILocatarioService locatarioService, IColaboradorService colaboradorService)
        {
            _tokenService = tokenService;
            _userService = userService;
            _hashingPasswordService = hashingPasswordService;
            _locadorService = locadorService;
            _locatarioService = locatarioService;
            _colaboradorService = colaboradorService;
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] UserLoginModel loginModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _userService.GetUserByEmail(loginModel.Email);

            // Verificar hash da senha

            if (user == null || !(await _hashingPasswordService.VerifyPassword(loginModel.Senha, user.Senha)))
            {
                return BadRequest("Usuário ou senha inválidos");
            }

            var token = _tokenService.GenerateToken(user);

            return Ok(new { token });
        }

        [Authorize]
        [HttpGet("WhoAmI")]
        public async Task<IActionResult> WhoAmI()
        {
            var role = HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role)?.Value;

            if (role == null)
            {
                return BadRequest("Erro a fazer a requisição");
            }

            if(role == Roles.Locador.ToString())
            {
                var email = User.FindFirst(ClaimTypes.NameIdentifier).Value;

                var user = await _userService.GetUserByEmail(email);

                var locador = await _locadorService.GetLocadorByUserId(user.UsuarioId);

                var noColaborador = new NoColaboradorUserModel {
                    UsuarioId = user.UsuarioId,
                    RoleId = locador.LocadorId,
                    Role = Roles.Locador.ToString(),
                    Nome = locador.NomeCompletoLocador,
                    CPF = locador.CPF,
                    Telefone = locador.NumeroTelefone,
                    Nacionalidade = locador.Nacionalidade,
                    Endereco = locador.Endereco,
                    CNPJ = locador.CNPJ,
                    Passaporte = locador.Passaporte,
                    RG = locador.RG,
                    Email = user.Email,
                    Ativo = user.Ativo,
                    DataCriacao = user.DataRegistro
                };

                return Ok(noColaborador);
            } else if(role == Roles.Locatario.ToString())
            {
                var email = User.FindFirst(ClaimTypes.NameIdentifier).Value;

                var user = await _userService.GetUserByEmail(email);

                var locatario = await _locatarioService.GetLocatarioByUserId(user.UsuarioId);

                var noColaborador = new NoColaboradorUserModel {
                    UsuarioId = user.UsuarioId,
                    RoleId = locatario.LocatarioId,
                    Role = Roles.Locatario.ToString(),
                    Nome = locatario.NomeCompletoLocatario,
                    CPF = locatario.CPF,
                    Telefone = locatario.NumeroTelefone,
                    Nacionalidade = locatario.Nacionalidade,
                    Endereco = locatario.Endereco,
                    CNPJ = locatario.CNPJ,
                    Passaporte = locatario.Passaporte,
                    RG = locatario.RG,
                    Email = user.Email,
                    Ativo = user.Ativo,
                    DataCriacao = user.DataRegistro
                };

                return Ok(noColaborador);
            } else if(role == Roles.Admin.ToString())
            {
                var email = User.FindFirst(ClaimTypes.NameIdentifier).Value;

                var user = await _userService.GetUserByEmail(email);

                var colaborador = await _colaboradorService.GetColaboradorByUserId(user.UsuarioId);

                var colaboradorResult = new ColaboradorUserModel {
                    UsuarioId = user.UsuarioId,
                    ColaboradorIdId = colaborador.ColaboradorId,
                    Role = Roles.Admin.ToString(),
                    Nome = colaborador.NomeCompleto,
                    TipoColaborador = colaborador.TipoColaborador,
                    Email = user.Email,
                    Ativo = user.Ativo,
                    DataCriacao = user.DataRegistro
                };

                return Ok(colaboradorResult);
            } else if(role == Roles.Judiciario.ToString())
            {
                var email = User.FindFirst(ClaimTypes.NameIdentifier).Value;

                var user = await _userService.GetUserByEmail(email);

                var colaborador = await _colaboradorService.GetColaboradorByUserId(user.UsuarioId);

                var colaboradorResult = new ColaboradorUserModel{
                    UsuarioId = user.UsuarioId,
                    ColaboradorIdId = colaborador.ColaboradorId,
                    Role = Roles.Judiciario.ToString(),
                    Nome = colaborador.NomeCompleto,
                    TipoColaborador = colaborador.TipoColaborador,
                    Email = user.Email,
                    Ativo = user.Ativo,
                    DataCriacao = user.DataRegistro
                };

                return Ok(colaboradorResult);
            } else{
                return BadRequest("Erro a fazer a requisição");
            }

        }

        // [HttpGet("PegarUsuario")]
        // [Authorize(Policy = nameof(Roles.Admin))]
        // public async Task<IActionResult> PegarUsuario(int id)
        // {
        //     var user = await _userService.GetUserById(id);

            
        // }
    }
}