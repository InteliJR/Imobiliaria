using Microsoft.AspNetCore.Mvc;
using Layer.Domain.Interfaces;
using Layer.Application.Models;
using Layer.Domain.Entities;
using Layer.Domain.Enums;
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
        // [Authorize(Policy = nameof(Roles.Admin))] // AQUI TÁ COMENTADO PRA NÃO PRECISAR DE AUTENTICAÇÃO PQ O TOKEN TÁ EM OUTRO SERVIÇO
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _userService.GetUsuariosAsync();
            return Ok(users);
        }

        [HttpPost("AdicionarNovoUsuario")]
        // [Authorize(Policy = nameof(Roles.Admin))]
        public async Task<IActionResult> AddNewUser([FromQuery] Roles role, [FromBody] NewUserModel userModel)
        {
            if (!ModelState.IsValid) // Verifica se o modelo é realmente válido
            {
                return BadRequest(ModelState);
            }

            var user = new User
            {
                Email = userModel.Email,
                Senha = null, // Criptografar a senha
                TipoUsuario = role.ToString(),
                Ativo = true,
                DataRegistro = DateTime.Now,
                DataAtualizacao = DateTime.Now
            };

            var newUser = await _userService.InsertNewUser(user, true);
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


        [HttpDelete("DeletarUsuario")]
        public async Task<IActionResult> DeleteUser([FromQuery] [EmailAddress] string email)
        {

            await _userService.DeleteUser(email);

            return Ok("Usuário deletado com sucesso.");
        }




    }
}
