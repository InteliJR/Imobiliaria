using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Layer.Domain.DTO;
using Layer.Domain.Entities;
using Layer.Domain.Interfaces;
using Layer.Domain.Enums;
using Layer.Infrastructure.Database;
using System.Security.Claims;
using Layer.Application.Models;

namespace Layer.Application.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RentController : ControllerBase
    {
        private readonly IRentService _rentService;
        private readonly IPaymentService _paymentService;

        private readonly ApplicationLog _applicationLog;

        public RentController(IRentService rentService, ApplicationLog applicationLog, IPaymentService paymentService)
        {
            _rentService = rentService;
            _applicationLog = applicationLog;
            _paymentService = paymentService;
        }

        [HttpGet("PegarTodosAlugueis")]
        [Authorize(Policy = nameof(Roles.Admin))]
        public async Task<ActionResult<IEnumerable<Rent>>> GetAllRents()
        {
            var rents = await _rentService.GetAllRentsAsync();
            return Ok(rents);
        }

        [HttpGet("aluguel/{id}")]
        [Authorize(Policy = nameof(Roles.Admin))]
        public async Task<ActionResult<Rent>> GetRentById(int id)
        {
            var rent = await _rentService.GetRentByIdAsync(id);
            return Ok(rent);
        }

        [HttpGet("alugueis/imovel/{imovelid}")]
        [Authorize(Policy = nameof(Roles.Admin))]
        public async Task<ActionResult<IEnumerable<Rent>>> GetAllRentsByIdImovel(int imovelid)
        {
            var rents = await _rentService.GetAllRentsWithPaymentsByIdImovel(imovelid);
            return Ok(rents);
        }

        [HttpGet("alugueis/locatario/{locatarioid}")]
        [Authorize(Policy = nameof(Roles.Admin))]
        public async Task<ActionResult<IEnumerable<Rent>>> GetAllRentsByIdLocatario(int locatarioid)
        {
            var rents = await _rentService.GetAllRentsByIdLocatario(locatarioid);
            return Ok(rents);
        }

        [HttpGet("alugueis/locador/{locadorid}")]
        [Authorize(Policy = nameof(Roles.Admin))]
        public async Task<ActionResult<IEnumerable<Rent>>> GetAllRentsByIdLocador(int locadorid)
        {
            var rents = await _rentService.GetAllRentsByIdLocador(locadorid);
            return Ok(rents);
        }

        [HttpGet("alugueis/contrato/{contractid}")]
        [Authorize(Policy = nameof(Roles.Admin))]
        public async Task<ActionResult<IEnumerable<Rent>>> GetAllRentsByContractId(int contractid)
        {
            var contract = await _rentService.ContractById(contractid);
            var rents = await _rentService.GetAllRentsWithPaymentsByContractId(contractid);
            return Ok(rents);
        }

        [HttpGet("alugueis/pagamento/{paymentid}")]
        [Authorize(Policy = nameof(Roles.Admin))]
        public async Task<ActionResult<Rent>> GetAllRentByPaymentId(int paymentid)
        {
            var rent = await _rentService.GetAllRentByPaymentId(paymentid);
            return Ok(rent);
        }

        [HttpGet("alugueis/vencimento/{dueDate}")]
        [Authorize(Policy = nameof(Roles.Admin))]
        public async Task<ActionResult<IEnumerable<Rent>>> GetRentsDueByDate(DateTime dueDate)
        {
            var rents = await _rentService.GetRentsDueByDateAsync(dueDate);
            return Ok(rents);
        }

        [HttpPost("adicionar")]
        [Authorize(Policy = nameof(Roles.Admin))]
        public async Task<ActionResult> AddRent([FromBody] RentModel rent)
        {
            // Montar objeto Rent
            var newRent = new Rent
            {
                ContratoId = rent.ContratoId,
                PagamentoId = rent.PagamentoId,
                Status = rent.Status,
                Mes = rent.Mes,
                BoletoDoc = rent.BoletoDoc
            };

            var resultRent = await _rentService.AddRentAsync(newRent);
            return Ok(resultRent);
        }

        [HttpPut("atualizar")]
        [Authorize(Policy = nameof(Roles.Admin))]
        public async Task<ActionResult> UpdateRent([FromBody] RentModel rent)
        {
            // Montar objeto Rent
            var newRent = new Rent
            {
                ContratoId = rent.ContratoId,
                PagamentoId = rent.PagamentoId,
                Status = rent.Status,
                Mes = rent.Mes,
                BoletoDoc = rent.BoletoDoc
            };

            var updatedRent = await _rentService.UpdateRentAsync(newRent);
            return Ok(updatedRent);
        }

        [HttpDelete("excluir/{id}")]
        [Authorize(Policy = nameof(Roles.Admin))]
        public async Task<ActionResult> DeleteRent(int id)
        {
            await _rentService.DeleteRentAsync(id);
            return Ok();
        }

        [HttpPost("atualizar/pago/")]
        [Authorize(Policy = nameof(Roles.Admin))]
        public async Task<ActionResult> UpdateRentToPaid(PaymentToRent payment)
        {
            // Pegar rent
            var rent = await _rentService.GetRentByIdAsync(payment.RentId);

            // Montar obejto de payment
            var newPayment = new Payment
            {
                Valor = payment.Valor,
                ContratoId = rent.ContratoId,
                Pagante = payment.Pagante,
                MetodoPagamento = payment.MetodoPagamento,
                Descricao = payment.Descricao,
                TipoPagamento = payment.TipoPagamento,
                Multa = payment.Multa,
                ValorMulta = payment.ValorMulta
            };

            // Adicionar pagamento
            var resultPayment = new Payment();
            try
            {
                resultPayment = await _paymentService.AddPaymentAsync(newPayment);
            } catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            var updatedRent = await _rentService.UpdateRentToPaidAsync(payment.RentId, resultPayment.PaymentId);
            return Ok(updatedRent);
        }

        [HttpPost("criar/proximoMes/{contratoId}/{numberOfMonthsAhead}")]
        [Authorize(Policy = nameof(Roles.Admin))]
        public async Task<ActionResult> CreateRentNextMonth(int contratoId, int numberOfMonthsAhead)
        {
            var newRent = await _rentService.CreateRentNextMonthAsync(contratoId, numberOfMonthsAhead);
            return Ok(newRent);
        }

        [HttpGet("meusAlugueis")]
        [Authorize(Policy = "AllRoles")]
        public async Task<ActionResult<IEnumerable<Rent>>> GetMyRents(int contratoId)
        {
            var role = HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role)?.Value;
            var roleId = int.Parse(HttpContext.User.Claims.FirstOrDefault(x => x.Type == "RoleID")?.Value);

            var contract = await _rentService.ContractById(contratoId);


            if (role == Roles.Admin.ToString())
            {
                return Ok("Você não tem nenhum aluguel.");
            }else if(role == Roles.Locatario.ToString())
            {
                // Verificar se o contratoId é do locatario
                Console.WriteLine("LocatarioId: " + contract.LocatarioId);
                Console.WriteLine("RoleId: " + roleId);
                if(contract.LocatarioId != roleId)
                {
                    return BadRequest("Você não tem permissão para acessar esses alugueis.");
                }

                var rents = await _rentService.GetAllRentsWithPaymentsByContractId(contratoId);
                return Ok(rents);
            }else if(role == Roles.Locador.ToString())
            {
                // Verificar se o contratoId é do locador
                Console.WriteLine("LocadorId: " + contract.LocadorId);
                Console.WriteLine("RoleId: " + roleId);
                if(contract.LocadorId != roleId)
                {
                    return BadRequest("Você não tem permissão para acessar esses alugueis.");
                }

                var rents = await _rentService.GetAllRentsWithPaymentsByContractId(contratoId);
                return Ok(rents);
            }else{
                return BadRequest("Erro ao fazer a requisição.");
            }

        }
    }
}
