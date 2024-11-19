using Layer.Application.Models;
using Layer.Domain.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;


namespace Layer.Application.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AccountController : Controller
    {

        private readonly ITokenService _tokenService;
        private readonly IUserService _userService;
        private readonly IHashingPasswordService _hashingPasswordService;

        public AccountController(ITokenService tokenService, IUserService userService, IHashingPasswordService hashingPasswordService)
        {
            _tokenService = tokenService;
            _userService = userService;
            _hashingPasswordService = hashingPasswordService;
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] UserLoginModel loginModel) {
            if (!ModelState.IsValid) {
                return BadRequest(ModelState);
            }

            var user = await _userService.GetUserByEmail(loginModel.Email);

            // Verificar hash da senha

            if (user == null || !(await _hashingPasswordService.VerifyPassword(loginModel.Senha, user.Senha))) {
                return BadRequest("Usuário ou senha inválidos");
            }

            var token = _tokenService.GenerateToken(user);

            return Ok(new { token });
        }
        
        [Authorize]
        [HttpPost("WhoAmI")]
        public async Task<IActionResult> WhoAmI() {
            // Puxar Email do usuário logado
            var email = User.FindFirst(ClaimTypes.NameIdentifier).Value;

            var user = await _userService.GetUserByEmail(email);

            return Ok(user);

        }
    }
}
