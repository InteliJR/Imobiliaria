using Microsoft.AspNetCore.Mvc;
using Layer.Domain.Interfaces;
using Layer.Domain.Enums;
using property_management.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Layer.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace Layer.Application.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ImoveisController : Controller
    {
        // Chamar o serviço de usuário
        private readonly IimoveisRepository _imoveisService;

        // Construtor
        public ImoveisController(IimoveisRepository imovelService)
        {
            _imoveisService = imovelService;
        }

        // Rota de pagar todos os imóveis
        [HttpGet("PegarTodosImoveis")]
        [Authorize(Policy = "AdminORJudiciario")]
        public async Task<IActionResult> GetAllImoveis()
        {
            var imoveis = await _imoveisService.GetImoveisAsync();
            return Ok(imoveis);
        }

        [HttpPost("CriarUmNovoImovel")]
        [Authorize(Policy = nameof(Roles.Admin))]
        public async Task<IActionResult> PostImoveis([FromBody] NewImoveis newImovel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var imovel = new Imoveis
            {
                TipoImovel = newImovel.TipoImovel,
                Cep = newImovel.Cep,
                Condominio = newImovel.Condominio,
                ValorImovel = newImovel.ValorImovel,
                Bairro = newImovel.Bairro,
                Descricao = newImovel.Descricao,
                Endereco = newImovel.Endereco,
                Complemento = newImovel.Complemento
            };

            var novoImovel = await _imoveisService.PostImoveisAsync(imovel);
            return Ok(novoImovel);
        }

        [HttpPut("AtualizarImovel/{id}")]
        [Authorize(Policy = nameof(Roles.Admin))]
        public async Task<IActionResult> UpdateImovel(int id, [FromBody] UpdateImoveis updatedImovel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var imovel = await _imoveisService.GetByIdImoveisAsync(id);

            if (imovel == null)
            {
                return NotFound(); // Retorna 404 se o imóvel não for encontrado
            }

            imovel.TipoImovel = updatedImovel.TipoImovel;
            imovel.Cep = updatedImovel.Cep;
            imovel.Condominio = updatedImovel.Condominio;
            imovel.ValorImovel = updatedImovel.ValorImovel;
            imovel.Bairro = updatedImovel.Bairro;
            imovel.Descricao = updatedImovel.Descricao;
            imovel.Endereco = updatedImovel.Endereco;
            imovel.Complemento = updatedImovel.Complemento;

            _imoveisService.UpdateImoveisAsync(id, imovel);
            return Ok(imovel);
        }

        [HttpGet("PegarImovelPorId/{id}")]
        [Authorize(Policy = "AdminORJudiciario")]
        public async Task<IActionResult> GetImovelById(int id)
        {
            var imovel = await _imoveisService.GetByIdImoveisAsync(id);
            if (imovel == null)
            {
                return NotFound();
            }
            return Ok(imovel);
        }

        [HttpDelete("DeletarImovel/{id}")]
        [Authorize(Policy = nameof(Roles.Admin))]
        public async Task<IActionResult> DeleteImovel(int id)
        {
            var imovel = await _imoveisService.GetByIdImoveisAsync(id);

            if(imovel == null)
            {
                return NotFound();
            }

            await _imoveisService.DeleteImoveisAsync(id);
            return NoContent();
        }
    }
}