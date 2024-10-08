using Microsoft.AspNetCore.Mvc;
using Layer.Domain.Interfaces;

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

        [HttpGet]
        public async Task<IActionResult> SendEmail([FromQuery] string emailRecipient, [FromQuery] string mensage)
        {
            await _emailService.SendEmailAsync(emailRecipient, mensage);
            return Ok();
        }


       
    }
}
