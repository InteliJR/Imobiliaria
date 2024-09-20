using Microsoft.AspNetCore.Mvc;
using Layer.Domain.Interfaces;

namespace Layer.Application.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ImoveisController : Controller
    {
        // Chamar o serviço de usuário
        private readonly Iimoveis _imoveisService;

        // Construtor
        public ImoveisController(Iimoveis imovelService)
        {
            _imoveisService = imovelService;
        }

        // Rota de pagar todos os imóveis
        [HttpGet("PegarTodosImoveis")]
        public async Task<IActionResult> GetAllImoveis()
        {
            var imoveis = await _imoveisService.GetImoveisAsync();
            return Ok(imoveis);
        }
    }
}