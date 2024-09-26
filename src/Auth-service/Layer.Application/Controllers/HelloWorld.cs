using Microsoft.AspNetCore.Mvc;
using Layer.Services;
using Layer.Domain.Interfaces;
using Layer.Domain.Entities;

namespace Layer.Application.Controllers
{
    [ApiController] // Indica que a classe é um controller
    [Route("[controller]")] // Define a rota do controller que vai ser o nome da classe, assim quando formos aceesar o controller, vamos acessar pelo nome da classe/rota que queremos
    public class HelloWorld : Controller
    {
        private readonly IMessageService _messageService; // Criando uma variável do tipo IMessageService

        public HelloWorld(IMessageService messageService) // Construtor que recebe um IMessageService
        {
            _messageService = messageService; // Atribuindo o IMessageService recebido ao IMessageService criado
        }

        [HttpPost("AdicionarMsg")]
        public async Task<IActionResult> AddMensage([FromBody] string mensage) // Método adicionar uma nova msg
        {
            await _messageService.Add(new Message { MenssageContent = mensage }); // Adicionando a mensagem
            return Ok();
        }

        [HttpGet("PegarTodasMsgs")]
        public async Task<IActionResult> GetAllMensages()
        {
            var mensages = await _messageService.GetAll();
            return Ok(mensages); // retornar um status 200 com as mensagens
        }
    }
}
