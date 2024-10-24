using Microsoft.AspNetCore.Mvc;
using Layer.Domain.Interfaces;
using Layer.Infrastructure.ServicesInternal;
using Layer.Domain.DTO;

namespace Layer.Application.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserServiceControler : Controller
    {
        private readonly ITokenService _tokenService;

        public UserServiceControler(ITokenService tokenService)
        {
            _tokenService = tokenService;
        }

        [HttpPost("GetToken")]

        public async Task<IActionResult> GetToken([FromBody] LoginModel login)
        {
            var token = await _tokenService.GenerateTokenAsync(login.Email, login.Password);
            return Ok(token);
        }


    }
}
