using Microsoft.AspNetCore.Mvc;
using Layer.Domain.Interfaces;
using Layer.Application.Models;
using Layer.Domain.Entities;

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
        public async Task<IActionResult> GetAllLocadors()
        {
            var locadors = await _locadorService.GetAllLocadorsAsync();
            return Ok(locadors);
        }

        [HttpGet("PegarLocadorPorEmail")]
        public async Task<IActionResult> GetLocadorByEmail([FromQuery] string email)
        {
            var locador = await _locadorService.GetLocadorByEmail(email);
            return Ok(locador);
        }

        [HttpPost("AdicionarNovoLocador")]
        public async Task<IActionResult> AddNewLocador([FromBody] NewLocadorModel locador)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Pegar o id do usuário pelo email e adicionar no locador

            var userID = await _userService.GetUserByEmail(locador.Email);

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
        public async Task<IActionResult> LocadorExist([FromQuery] string locadorCPF)
        {
            var locador = await _locadorService.LocadorExist(locadorCPF);
            return Ok(locador);
        }

        [HttpGet("PegarLocadorPorUserId")]
        public async Task<IActionResult> GetLocadorByUserId([FromQuery] int userId)
        {
            var locador = await _locadorService.GetLocadorByUserId(userId);
            return Ok(locador);
        }

    }
}
