using Microsoft.AspNetCore.Mvc;
using Layer.Domain.Interfaces;
using Layer.Application.Models;
using Layer.Domain.Entities;
using System.ComponentModel.DataAnnotations;

namespace Layer.Application.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class LocadorController : Controller
    {

        private readonly ILocadorService _locadorService;
        private readonly IUserService _userService;

        public LocadorController(ILocadorService locadorService, IUserService userService)
        {
            _locadorService = locadorService;
            _userService = userService;
        }

        [HttpGet("PegarTodosLocadores")]
        [Authorize(Policy = nameof(Roles.Admin))]
        public async Task<IActionResult> GetAllLocadors()
        {
            var locadors = await _locadorService.GetAllLocadorsAsync();
            return Ok(locadors);
        }

        [HttpGet("PegarLocadorPorEmail")]
        [Authorize(Policy = "AdminORLocador")]
        public async Task<IActionResult> GetLocadorByEmail([FromQuery] string email)
        {
            var locador = await _locadorService.GetLocadorByEmail(email);
            return Ok(locador);
        }

        [HttpPost("AdicionarNovoLocador")]
        public async Task<IActionResult> AddNewLocador([Required] [EmailAddress] string email, [FromBody] NewLocadorModel locador)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Pegar o id do usuário pelo email e adicionar no locador

            var userID = await _userService.GetUserByEmail(email);

            if (userID == null)
            {
                return BadRequest("Usuário não encontrado.");
            }

            var userAlreadyLinked = await _locadorService.UserAlreadyLinkedLocador(userID.UsuarioId);

            if (userAlreadyLinked)
            {
                return BadRequest("Usuário já está vinculado a um locador.");
            }

            // Montar o objeto Locador
            var locadorNew = new Locador
            {
                UsuarioId = userID.UsuarioId,
                ImovelId = locador.ImovelId,
                PessoaJuridica = false,
                CPF = locador.CPF,
                Nacionalidade = locador.Nacionalidade,
                NumeroTelefone = locador.NumeroTelefone,
                NomeCompletoLocador = locador.NomeCompletoLocador,
                CNPJ = locador.CNPJ,
                Endereco = locador.Endereco,
                Passaporte = locador.Passaporte,
                RG = locador.RG
            };

            var newLocador = await _locadorService.InsertNewLocador(locadorNew);
            return Ok(newLocador);
        }

        [HttpGet("LocadorExiste")]
        [Authorize(Policy = "AdminORLocador")]
        public async Task<IActionResult> LocadorExist([FromQuery] string locadorCPF)
        {
            var locador = await _locadorService.LocadorExist(locadorCPF);
            return Ok(locador);
        }

        [HttpGet("PegarLocadorPorUserId")]
        [Authorize(Policy = "AdminORLocador")]
        public async Task<IActionResult> GetLocadorByUserId([FromQuery] int userId)
        {
            var locador = await _locadorService.GetLocadorByUserId(userId);
            return Ok(locador);
        }

        [HttpGet("PegarLocadorPorLocadorID")]
        public async Task<IActionResult> GetLocadorByLocadorID([FromQuery] int locadorID)
        {
            var locador = await _locadorService.GetLocadorByLocadorID(locadorID);
            return Ok(locador);
        }

        [HttpPost("AtualizarLocador")]
        public async Task<IActionResult> UpdateLocador(string CPF, [FromBody] UpdateLocadorModel locadorToUpdate)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (locadorToUpdate == null)
            {
                return BadRequest("Locador não encontrado.");
            }

            var userID = await _userService.GetUserByCPF(CPF);

            if (userID == null)
            {
                return BadRequest("Usuário não encontrado.");
            }

            var locador = await _locadorService.GetLocadorByUserId(userID.UsuarioId);

            // Atualizar apenas os campos que foram preenchidos

            if (!string.IsNullOrEmpty(locadorToUpdate.CPF))
                locador.CPF = locadorToUpdate.CPF;
            if(!string.IsNullOrEmpty(locadorToUpdate.Nacionalidade))
                locador.Nacionalidade = locadorToUpdate.Nacionalidade;
            if(!string.IsNullOrEmpty(locadorToUpdate.NumeroTelefone))
                locador.NumeroTelefone = locadorToUpdate.NumeroTelefone;
            if(!string.IsNullOrEmpty(locadorToUpdate.NomeCompletoLocador))
                locador.NomeCompletoLocador = locadorToUpdate.NomeCompletoLocador;
            if(!string.IsNullOrEmpty(locadorToUpdate.CNPJ))
                locador.CNPJ = locadorToUpdate.CNPJ;
            if(!string.IsNullOrEmpty(locadorToUpdate.Endereco))
                locador.Endereco = locadorToUpdate.Endereco;
            if(!string.IsNullOrEmpty(locadorToUpdate.Passaporte))
                locador.Passaporte = locadorToUpdate.Passaporte;
            if(!string.IsNullOrEmpty(locadorToUpdate.RG))
                locador.RG = locadorToUpdate.RG;

            var updatedLocador = await _locadorService.UpdateLocador(locador);

            return Ok(updatedLocador);
        }

        [HttpDelete("DeletarLocador")]
        public async Task<IActionResult> DeleteLocador([FromBody] string CPF)
        {
            var locador = await _locadorService.DeleteLocador(CPF);
            return Ok(locador);
        }

    }
}
