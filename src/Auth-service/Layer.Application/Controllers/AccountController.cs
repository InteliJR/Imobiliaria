using Layer.Application.Models;
using Layer.Domain.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Layer.Application.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AccountController : Controller
    {

        private readonly ITokenService _tokenService;
        private readonly IUserService _userService;

        public AccountController(ITokenService tokenService, IUserService userService)
        {
            _tokenService = tokenService;
            _userService = userService;
        }

        [HttpPost("Login")]
        public async Task<IActionResult> GenerateTokenJWT([FromBody] UserLoginModel loginModel) {
            if (!ModelState.IsValid) {
                return BadRequest(ModelState);
            }

            var user = await _userService.GetUserByEmail(loginModel.Email);

            var token = _tokenService.GenerateToken(user);

            return Ok(token);
        }

        [HttpPost("WhoAmI")]
        public async Task<IActionResult> WhoAmI() {
            // Puxar Email do usuário logado
            var email = User.FindFirst(ClaimTypes.NameIdentifier).Value;

            var user = await _userService.GetUserByEmail(email);

            return Ok(user);

        }
    }
}
