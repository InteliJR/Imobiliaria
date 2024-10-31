using Layer.Domain.Entites;
using Layer.Domain.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace property_management.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChamadosController : ControllerBase
    {
        private readonly IChamadosRepository _chamadosService;

        public ChamadosController(IChamadosRepository chamadosService)
        {
            _chamadosService = chamadosService;
        }

        [HttpGet("PegarTodosOsChamados")]
        public async Task<ActionResult<IEnumerable<Chamados>>> GetAll()
        {
            var chamados = await _chamadosService.GetAllAsync();
            return Ok(chamados);
        }
    }
}
