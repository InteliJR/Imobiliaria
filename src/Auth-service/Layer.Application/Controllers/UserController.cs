﻿using Microsoft.AspNetCore.Mvc;
using Layer.Domain.Interfaces;
using Layer.Application.Models;
using Layer.Domain.Entities;
using Layer.Domain.Enums;
using Microsoft.AspNetCore.Authorization;
using Layer.Domain.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;
using Layer.Infrastructure.Database;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;



namespace Layer.Application.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : Controller
    {
        // Chamar o serviço de usuário
        private readonly IUserService _userService;
        private readonly ApplicationLog _applicationLog;

        // Construtor
        public UserController(IUserService userService, ApplicationLog applicationLog)
        {
            _userService = userService;
            _applicationLog = applicationLog;
        }

        // Rota de pagar todos os usuários
        [HttpGet("PegarTodosUsuarios")]
        [Authorize(Policy = nameof(Roles.Admin))]
        public async Task<IActionResult> GetAllUsers()
        {
            // Registra a ação no log
            await _applicationLog.LogAsync("PegarTodosUsuarios", HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value ?? "Email não encontrado", HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role)?.Value ?? "Role não encontrada");

            var users = await _userService.GetUsuariosAsync();
            return Ok(users);
        }

        [HttpPost("AdicionarNovoUsuario")]
        [Authorize(Policy = nameof(Roles.Admin))]
        public async Task<IActionResult> AddNewUser([FromQuery] Roles role, [FromBody] NewUserModel userModel)
        {
            if (!ModelState.IsValid) // Verifica se o modelo é realmente válido
            {
                return BadRequest(ModelState);
            }

            var user = new User
            {
                Email = userModel.Email,
                Senha = null,
                TipoUsuario = role.ToString(),
                Ativo = true,
                DataRegistro = DateTime.Now,
                DataAtualizacao = DateTime.Now
            };

            var newUser = await _userService.InsertNewUser(user, true);

            await _applicationLog.LogAsync($"Adicao de novo usuário, com o email {user.Email} ", HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value ?? "Email não encontrado", HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role)?.Value ?? "Role não encontrada");

            return Ok(newUser);
        }

        [HttpGet("VerificarUsuarioExistente")]
        [Authorize(Policy = nameof(Roles.Admin))]
        public async Task<IActionResult> CheckUserExist([FromQuery] string email)
        {
            var user = new User
            {
                Email = email
            };

            var userExist = await _userService.UserExist(user);

            return Ok(userExist);
        }

        [HttpGet("PegarUsuarioPorEmail")]
        [Authorize(Policy = nameof(Roles.Admin))]
        public async Task<IActionResult> GetUserByEmail([FromQuery] string email)
        {
            var user = await _userService.GetUserByEmail(email);
            return Ok(user);
        }

        [HttpGet("PegarUsuarioPorCPF")]
        [Authorize(Policy = nameof(Roles.Admin))]
        public async Task<IActionResult> GetUserInfoRoleByCPF([FromQuery] string cpf)
        {
            var user = await _userService.GetUserByCPF(cpf);

            if (user == null)
            {
                return NotFound("Usuário não encontrado.");
            }

            return Ok(user);
        }

        [HttpDelete("DeletarUsuario")]
        [Authorize(Policy = nameof(Roles.Admin))]
        public async Task<IActionResult> DeleteUser([FromQuery][EmailAddress] string email)
        {

            await _userService.DeleteUser(email);


            await _applicationLog.LogAsync($"Exclusão de usuário com o email {email}", HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value ?? "Email não encontrado", HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role)?.Value ?? "Role não encontrada");

            return Ok("Usuário deletado com sucesso.");
        }

        [HttpPost("InativarUsuario")]
        [Authorize(Policy = nameof(Roles.Admin))]
        public async Task<IActionResult> InactivateUser([FromQuery] string email)
        {

            await _userService.InactivateUser(email);

            await _applicationLog.LogAsync($"Inativação usuário, com o email {email} ", HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value ?? "Email não encontrado", HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role)?.Value ?? "Role não encontrada");

            return Ok("Usuário inativado com sucesso.");
        }

        [HttpPost("CriarUsuarioLocador")]
        [Authorize(Policy = nameof(Roles.Admin))]
        public async Task<IActionResult> InsertNewUserLocador([FromQuery] string email, [FromBody] NewLocadorModel locador)
        {
            // Montar o objeto Locador
            var locadorNew = new Locador
            {
                UsuarioId = null,
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


            var userLocador = await _userService.IsertNewUserLocador(email, locadorNew);

            // Forçar desserialização do objeto para devolver
            var user = userLocador.Item1;
            var locadorCretead = userLocador.Item2;

            await _applicationLog.LogAsync($"Criação de usuario Locador {email} ", HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value ?? "Email não encontrado", HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role)?.Value ?? "Role não encontrada");

            return Ok(new { user, locador });
        }

        [HttpPost("CriarUsuarioLocatario")]
        [Authorize(Policy = nameof(Roles.Admin))]
        public async Task<IActionResult> InsertNewUserLocatario([FromQuery] string email, [FromBody] NewLocatarioModel locatario)
        {
            // Montar o objeto Locatario
            var locatarioNew = new Locatario
            {
                UsuarioId = null,
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

            var userLocatario = await _userService.IsertNewUserLocatario(email, locatarioNew);

            // Forçar desserialização do objeto para devolver
            var user = userLocatario.Item1;
            var locatarioCretead = userLocatario.Item2;

            await _applicationLog.LogAsync($"Criação de usuario Locatario {email} ", HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value ?? "Email não encontrado", HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role)?.Value ?? "Role não encontrada");

            return Ok(new { user, locatario });
        }

        [HttpPost("CriarUsuarioAdmin")]
        [Authorize(Policy = nameof(Roles.Admin))]
        public async Task<IActionResult> InsertNewUserColaboradorAdmin([FromQuery] string email, string NomeCompleto)
        {
            // Montar o objeto Colaborador
            var colaboradorNew = new Colaborador
            {
                UsuarioId = null,
                NomeCompleto = NomeCompleto,
                TipoColaborador = Roles.Admin.ToString()
            };

            var userColaborador = await _userService.InsertNewUserColaborador(email, colaboradorNew);

            // Forçar desserialização do objeto para devolver
            var user = userColaborador.Item1;
            var colaboradorCretead = userColaborador.Item2;

            await _applicationLog.LogAsync($"Criação de usuario Admin {email} ", HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value ?? "Email não encontrado", HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role)?.Value ?? "Role não encontrada");

            return Ok(new { user, colaboradorCretead });
        }

        [HttpPost("CriarUsuarioJudiciario")]
        [Authorize(Policy = nameof(Roles.Admin))]
        public async Task<IActionResult> InsertNewUserColaboradorJudiciario([FromQuery] string email, string NomeCompleto)
        {
            // Montar o objeto Colaborador
            var colaboradorNew = new Colaborador
            {
                UsuarioId = null,
                NomeCompleto = NomeCompleto,
                TipoColaborador = Roles.Judiciario.ToString()
            };

            var userColaborador = await _userService.InsertNewUserColaborador(email, colaboradorNew);

            // Forçar desserialização do objeto para devolver
            var user = userColaborador.Item1;
            var colaboradorCretead = userColaborador.Item2;

            await _applicationLog.LogAsync($"Criação de usuario Judiciario {email} ", HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value ?? "Email não encontrado", HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role)?.Value ?? "Role não encontrada");

            return Ok(new { user, colaboradorCretead });
        }

        [HttpGet("VerificarUsuariosInativos")]
        [Authorize(Policy = nameof(Roles.Admin))]
        public async Task<IActionResult> CheckInactiveUsers()
        {
            var users = await _userService.VerifyInactivityUser();
            return Ok(users);
        }

        [HttpPost("RedefinirSenhaUsuario")]
        [Authorize(Policy = "AllRoles")]
        public async Task<IActionResult> ForgotPassword([FromQuery] string email)
        {
            var newPassword = await _userService.UserForgotPassword(email);
            await _applicationLog.LogAsync($"Usuario com {email}, redefinou a senha ", HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value ?? "Email não encontrado", HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role)?.Value ?? "Role não encontrada");
            return Ok(newPassword);
        }

        [HttpPost("AlterarSenhaUsuario")]
        [Authorize(Policy = "AllRoles")]
        public async Task<IActionResult> ChangePassword([PasswordPropertyText] string oldPassword, [PasswordPropertyText] string newPassword)
        {
            
            var email = HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value
                ?? throw new ArgumentNullException("Email não encontrado.");
                
            if(email == null)
            {
                return BadRequest("Email não encontrado.");
            }

            var newPass = await _userService.ChangePassword(email, oldPassword, newPassword);

            await _applicationLog.LogAsync($"Usuario com {email} alterou sua senha", HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value ?? "Email não encontrado", HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role)?.Value ?? "Role não encontrada");

            return Ok(newPass);
        }

    }
}