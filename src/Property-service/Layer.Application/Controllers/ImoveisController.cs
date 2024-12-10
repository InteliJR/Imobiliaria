using Microsoft.AspNetCore.Mvc;
using Layer.Domain.Interfaces;
using Layer.Domain.Enums;
using property_management.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Layer.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Layer.Infrastructure.Database;
using System.Security.Claims;

namespace Layer.Application.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ImoveisController : Controller
    {
        // Chamar o serviço de usuário e o serviço de log
        private readonly IimoveisRepository _imoveisService;
        private readonly ApplicationLog _applicationLog;

        // Construtor
        public ImoveisController(IimoveisRepository imovelService, ApplicationLog applicationLog)
        {
            _imoveisService = imovelService;
            _applicationLog = applicationLog;
        }

        // Rota de pegar todos os imóveis
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
                Complemento = newImovel.Complemento,
                LocatarioId = newImovel.LocatarioId,
                LocadorId = newImovel.LocadorId
            };

            var novoImovel = await _imoveisService.PostImoveisAsync(imovel);

            await _applicationLog.LogAsync($"Criação de Imóvel com id: {novoImovel.ImovelId} ", HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value ?? "Email não encontrado", HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role)?.Value ?? "Role não encontrada");

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
            imovel.LocatarioId = updatedImovel.LocatarioId;
            imovel.LocadorId = updatedImovel.LocadorId;

            _imoveisService.UpdateImoveisAsync(id, imovel);

            await _applicationLog.LogAsync($"Atualização de Imóvel com id: {imovel.ImovelId} ", HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value ?? "Email não encontrado", HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role)?.Value ?? "Role não encontrada");

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

            await _applicationLog.LogAsync($"Imóvel Deletado com id: {imovel.ImovelId} ", HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value ?? "Email não encontrado", HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role)?.Value ?? "Role não encontrada");

            return NoContent();
        }
        
        [HttpPost("CriarImovelComFoto")]
        // [Authorize(Policy = nameof(Roles.Admin))]
        public async Task<IActionResult> PostImoveisWithPhoto([FromForm] NewImoveis newImovel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Salvar a foto no servidor
            string photoPath = null;
            if (newImovel.Fotos != null)
            {
                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images");
                if (!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }
                var uniqueFileName = $"{Guid.NewGuid()}_{newImovel.Fotos.FileName}";
                var filePath = Path.Combine(uploadsFolder, uniqueFileName);
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await newImovel.Fotos.CopyToAsync(fileStream);
                }
                photoPath = Path.Combine("images", uniqueFileName);
            }

            // Criar o imóvel com o caminho da foto
            var imovel = new Imoveis
            {
                TipoImovel = newImovel.TipoImovel,
                Cep = newImovel.Cep,
                Condominio = newImovel.Condominio,
                ValorImovel = newImovel.ValorImovel,
                Bairro = newImovel.Bairro,
                Descricao = newImovel.Descricao,
                Endereco = newImovel.Endereco,
                Complemento = newImovel.Complemento,
                LocatarioId = newImovel.LocatarioId,
                LocadorId = newImovel.LocadorId,
                Fotos = photoPath
            };

            var novoImovel = await _imoveisService.PostImoveisAsync(imovel);

            await _applicationLog.LogAsync($"Criação de Imóvel com id: {novoImovel.ImovelId}", 
                HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value ?? "Email não encontrado", 
                HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role)?.Value ?? "Role não encontrada");

            return Ok(novoImovel);
        }

        [HttpPut("AtualizarFoto/{id}")]
        // [Authorize(Policy = nameof(Roles.Admin))]
        public async Task<IActionResult> UpdatePhoto(int id, [FromForm] IFormFile photo)
        {
            var imovel = await _imoveisService.GetByIdImoveisAsync(id);

            if (imovel == null)
            {
                return NotFound();
            }

            // Salvar nova foto no servidor
            string newPhotoPath = null;
            if (photo != null)
            {
                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images");
                if (!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }
                var uniqueFileName = $"{Guid.NewGuid()}_{photo.FileName}";
                var filePath = Path.Combine(uploadsFolder, uniqueFileName);
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await photo.CopyToAsync(fileStream);
                }
                newPhotoPath = Path.Combine("images", uniqueFileName);
            }

            // Atualizar o caminho da foto
            imovel.Fotos = newPhotoPath;

            await _imoveisService.UpdateImoveisAsync(id, imovel);

            await _applicationLog.LogAsync($"Foto do imóvel com id {id} atualizada",
                HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value ?? "Email não encontrado", 
                HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role)?.Value ?? "Role não encontrada");

            return Ok(imovel);
        }

    }
}