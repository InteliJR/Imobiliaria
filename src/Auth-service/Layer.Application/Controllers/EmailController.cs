using Microsoft.AspNetCore.Mvc;
using Layer.Domain.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Layer.Domain.Enums;

namespace Layer.Application.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class EmailController : Controller
    {

        private readonly IEmailSender _emailService;

        public EmailController(IEmailSender emailService)
        {
            _emailService = emailService;
        }

        [HttpGet("EnviarEmailSenha")]
        [Authorize(Policy = nameof(Roles.Admin))]
        public async Task<IActionResult> SendEmail([FromQuery] string emailRecipient, [FromQuery] string mensage)
        {
            await _emailService.SendEmailAsync(emailRecipient, mensage, "NovoUsuario");
            return Ok();
        }



    }
}