using Microsoft.AspNetCore.Mvc;
using Layer.Domain.Interfaces;
using Layer.Application.Models;
using Layer.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Layer.Domain.Enums;

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
        [Authorize(Policy = nameof(Roles.Admin))]
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
                DataRegistro = DateTime.UtcNow,
                DataAtualizacao = DateTime.UtcNow
            };

            var newUser = await _userService.InsertNewUser(user);
            return Ok(newUser);
        }

    }
}
