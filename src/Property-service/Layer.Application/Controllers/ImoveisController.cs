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

        [HttpGet("PegarImovelPorIdComVerificacao/{id}")]
        [Authorize(Policy = "AllRoles")]
        public async Task<IActionResult> GetImovelByIdWithVerification(int id)
        {
            // Obter o RoleID do usuário logado
            var roleId = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "RoleID")?.Value;
            if (string.IsNullOrEmpty(roleId))
            {
                return Unauthorized("RoleID do usuário não encontrado.");
            }

            // Obter o papel do usuário logado (Locatário ou Locador)
            var userRole = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "http://schemas.microsoft.com/ws/2008/06/identity/claims/role")?.Value;
            if (string.IsNullOrEmpty(userRole))
            {
                return Unauthorized("Papel do usuário não definido.");
            }

            // Permitir acesso apenas se o papel for Locador ou Locatário
            if (userRole != nameof(Roles.Locador) && userRole != nameof(Roles.Locatario))
            {
                return Forbid("Acesso negado: apenas Locador ou Locatário têm permissão.");
            }

            // Buscar o imóvel pelo ID
            var imovel = await _imoveisService.GetByIdImoveisAsync(id);
            if (imovel == null)
            {
                return NotFound($"Imóvel com ID {id} não encontrado.");
            }

            // Verificar acesso com base no RoleID
            if (userRole == nameof(Roles.Locador) && imovel.LocadorId.ToString() != roleId)
            {
                return Forbid("Acesso negado: você não é o locador deste imóvel.");
            }

            if (userRole == nameof(Roles.Locatario) && imovel.LocatarioId.ToString() != roleId)
            {
                return Forbid("Acesso negado: você não é o locatário deste imóvel.");
            }

            // Caso o usuário tenha permissão, retornar o imóvel
            return Ok(imovel);
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

        [HttpGet("PegarImovelPorIdDoLocador/{locadorId}")]
        [Authorize(Policy = "AllRoles")]
        public async Task<IActionResult> GetImovelByIdDoLocador(int locadorId)
        {
            var imovel = await _imoveisService.GetImoveisByIdLocador(locadorId);
            if (imovel == null)
            {
                return NotFound();
            }
            return Ok(imovel);
        }

        [HttpGet("PegarImovelPorIdDoLocatario/{locatarioId}")]
        [Authorize(Policy = "AllRoles")]
        public async Task<IActionResult> GetImovelByIdDoLocatario(int locatarioId)
        {
            var imovel = await _imoveisService.GetImoveisByIdLocatario(locatarioId);
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
        // [Consumes("multipart/form-data")]
        [Authorize(Policy = nameof(Roles.Admin))]
        public async Task<IActionResult> PostImoveisWithPhoto([FromForm] NewImoveis newImovel, [FromForm] IFormFileCollection files)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (files == null || files.Count == 0)
            {
                return BadRequest("Nenhum arquivo foi enviado.");
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
                LocadorId = newImovel.LocadorId
            };

            var novoImovel = await _imoveisService.AddImoveisWithPhotosAsync(imovel, files);

            await _applicationLog.LogAsync($"Criação de Imóvel com id: {novoImovel.ImovelId}", 
                HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value ?? "Email não encontrado", 
                HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role)?.Value ?? "Role não encontrada");

            return Ok(novoImovel);
        }

        [HttpGet("AssinarFoto")]
        [Authorize (Policy = "AllRoles")]
        public async Task<IActionResult> GenerateSignedUrlOfImovelImage(string idImage)
        {
            var url = await _imoveisService.GenerateSignedUrlOfImovelImageAsync(idImage);
            return Ok(url);
        }

        [HttpPost("AssinarFotos")]
        [Authorize (Policy = "AllRoles")]
        public async Task<IActionResult> GenerateSignedUrlOfImovelImages(List<string> idImages)
        {
            var urls = await _imoveisService.GenerateSignedUrlsOfImovelImagesAsync(idImages);
            return Ok(urls);
        }

        [HttpPost("AdicionarFotos/{id}")]
        [Consumes("multipart/form-data")]
        [Authorize (Policy = "AllRoles")]
        public async Task<IActionResult> AddImovelPhotos(int id, IFormFileCollection files)
        {
            var urls = await _imoveisService.AddImovelPhotosAsync(id, files);
            return Ok(urls);
        }

        [HttpDelete("DeletarFoto/{id}")]
        [Authorize (Policy = "AllRoles")]
        public async Task<IActionResult> DeleteImovelPhoto(int id, string objectName)
        {
            await _imoveisService.DeleteImovelPhotoAsync(id, objectName);
            return Ok();
        }
    }
}