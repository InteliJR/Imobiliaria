using Microsoft.AspNetCore.Mvc;
using Layer.Domain.Interfaces;
using Layer.Application.Models;
using Layer.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Layer.Domain.Enums;
using System.ComponentModel.DataAnnotations;

namespace Layer.Application.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : Controller
    {
        // Chamar o serviço de usuário
        private readonly IUserService _userService;

        // Construtor
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        // Rota de pagar todos os usuários
        [HttpGet("PegarTodosUsuarios")]
        // [Authorize(Policy = nameof(Roles.Admin))]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _userService.GetUsuariosAsync();
            return Ok(users);
        }

        [HttpPost("AdicionarNovoUsuario")]
        [Authorize(Policy = nameof(Roles.Admin))]
        public async Task<IActionResult> AddNewUser([FromBody] NewUserModel userModel)
        {
            if (!ModelState.IsValid) // Verifica se o modelo é realmente válido
            {
                return BadRequest(ModelState);
            }

            var user = new User
            {
                Email = userModel.Email,
                Senha = userModel.Senha, // TODO: Criptografar a senha
                TipoUsuario = userModel.TipoUsuario,
                Ativo = true,
                DataRegistro = DateTime.Now,
                DataAtualizacao = DateTime.Now
            };

            var newUser = await _userService.InsertNewUser(user);
            return Ok(newUser);
        }

        [HttpGet("VerificarUsuarioExistente")]
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
        public async Task<IActionResult> GetUserByEmail([FromQuery] string email)
        {
            var user = await _userService.GetUserByEmail(email);
            return Ok(user);
        }

        [HttpGet("PegarUsuarioPorCPF")]
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
        public async Task<IActionResult> DeleteUser([FromQuery] [EmailAddress] string email)
        {

            await _userService.DeleteUser(email);

            return Ok("Usuário deletado com sucesso.");
        }

        [HttpPost("InativarUsuario")]
        public async Task<IActionResult> InactivateUser([FromQuery] string email)
        {

            await _userService.InactivateUser(email);

            return Ok("Usuário inativado com sucesso.");
        }

        [HttpPost("CriarUsuarioLocador")]
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

            return Ok(new { user, locador });
        }

        [HttpGet("VerificarUsuariosInativos")]
        public async Task<IActionResult> CheckInactiveUsers()
        {
            var users = await _userService.VerifyInactivityUser();
            return Ok(users);
        }

    }
}
