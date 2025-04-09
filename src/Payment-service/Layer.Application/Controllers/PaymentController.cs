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


namespace Layer.Application.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PaymentController : ControllerBase
    {
        private readonly IPaymentService _paymentService;
        private readonly IEmailSender _emailSender;
        private readonly ApplicationLog _applicationLog;

        public PaymentController(IPaymentService paymentService, IEmailSender emailSender, ApplicationLog applicationLog)
        {
            _paymentService = paymentService;
            _emailSender = emailSender;
            _applicationLog = applicationLog;
        }

        // GET: api/payment/listarpagamentos
        [HttpGet("listar-pagamentos")]
        [Authorize(Policy = "AdminORJudiciario")]
        public async Task<ActionResult<IEnumerable<Payment>>> GetAllPayments()
        {
            var payments = await _paymentService.GetAllPaymentsAsync();
            return Ok(payments);
        }

        // GET: api/payment/pagamentos/{id}
        [HttpGet("pagamentos/{id}")]
        [Authorize(Policy = "AllRoles")]
        public async Task<ActionResult<GetPaymentDTO>> GetPaymentById(int id)
        {
            var payment = await _paymentService.GetPaymentByIdAsync(id);
            if (payment == null)
            {
                _applicationLog.LogAsync($"Payment with ID {id} not found.", HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value ?? "Email não encontrado", HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role)?.Value ?? "Role não encontrada");
                return NotFound();
            }
            _applicationLog.LogAsync($"Payment with ID {id} retrieved.", HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value ?? "Email não encontrado", HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role)?.Value ?? "Role não encontrada");
            return Ok(payment);
        }

        // GET: api/Payments/ByImovel/5
        [HttpGet("ByImovel/{imovelid}")]
        [Authorize(Policy = "AllRoles")]
        public async Task<ActionResult<List<GetPaymentDTO>>> GetPaymentsByImovel(int imovelid)
        {
            var payments = (await _paymentService.GetAllPaymentsByIdImovel(imovelid)).ToList();

            if (payments.Any())
            {
                await _applicationLog.LogAsync(
                    $"Payments retrieved for Imovel ID {imovelid}.",
                    HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value ?? "Email não encontrado",
                    HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role)?.Value ?? "Role não encontrada"
                );
                return Ok(payments);
            }
            else
            {
                await _applicationLog.LogAsync(
                    $"No payments found for Imovel ID {imovelid}.",
                    HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value ?? "Email não encontrado",
                    HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role)?.Value ?? "Role não encontrada"
                );
                return Ok(new List<GetPaymentDTO>()); // ← Retorna 200 com lista vazia
            }
        }


        // POST: api/payment/criar-pagamentos
        [HttpPost("criar-pagamentos")]
        [Authorize(Policy = nameof(Roles.Admin))]
        public async Task<ActionResult<Payment>> AddPayment([FromBody] CreatePaymentDTO paymentDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var payment = new Payment
            {
                ContratoId = paymentDto.ContratoId,
                Valor = paymentDto.Valor,
                Data = paymentDto.Data,
                Pagante = paymentDto.Pagante,
                MetodoPagamento = paymentDto.MetodoPagamento,
                Descricao = paymentDto.Descricao,
                TipoPagamento = paymentDto.TipoPagamento,
                Multa = paymentDto.Multa,
                ValorMulta = paymentDto.ValorMulta
            };

            await _paymentService.AddPaymentAsync(payment);
            _applicationLog.LogAsync("New payment created.", HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value ?? "Email não encontrado", HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role)?.Value ?? "Role não encontrada");
            return Ok();
        }

        // PUT: api/payment/atualizar-pagamento/{id}
        [HttpPut("atualizar-pagamento/{id}")]
        [Authorize(Policy = nameof(Roles.Admin))]
        public async Task<IActionResult> UpdatePayment(int id, [FromBody] CreatePaymentDTO paymentDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var existingPayment = await _paymentService.GetPaymentByIdAsync(id);
            if (existingPayment == null)
            {
                _applicationLog.LogAsync($"Payment with ID {id} not found for update.", HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value ?? "Email não encontrado", HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role)?.Value ?? "Role não encontrada");
                return NotFound();
            }

            var newPayment = new Payment
            {
                ContratoId = paymentDto.ContratoId,
                Valor = paymentDto.Valor,
                Data = paymentDto.Data,
                Pagante = paymentDto.Pagante,
                MetodoPagamento = paymentDto.MetodoPagamento,
                Descricao = paymentDto.Descricao,
                TipoPagamento = paymentDto.TipoPagamento,
                Multa = paymentDto.Multa,
                ValorMulta = paymentDto.ValorMulta
            };

            await _paymentService.UpdatePaymentAsync(newPayment);
            _applicationLog.LogAsync($"Payment with ID {id} updated.", HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value ?? "Email não encontrado", HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role)?.Value ?? "Role não encontrada");
            return NoContent();
        }

        // DELETE: api/payment/excluir-pagamento/{id}
        [HttpDelete("excluir-pagamento/{id}")]
        [Authorize(Policy = nameof(Roles.Admin))]
        public async Task<IActionResult> DeletePayment(int id)
        {
            var payment = await _paymentService.GetPaymentByIdAsync(id);
            if (payment == null)
            {
                _applicationLog.LogAsync($"Payment with ID {id} not found for deletion.", HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value ?? "Email não encontrado", HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role)?.Value ?? "Role não encontrada");
                return NotFound();
            }

            await _paymentService.DeletePaymentAsync(id);
            _applicationLog.LogAsync($"Payment with ID {id} deleted.", HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value ?? "Email não encontrado", HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role)?.Value ?? "Role não encontrada");
            return NoContent();
        }

        // POST: api/payment/enviar-lembrete-pagamento
        [HttpPost("enviar-lembrete-pagamento")]
        [Authorize(Policy = nameof(Roles.Admin))]
        public async Task<IActionResult> EnviarLembretePagamento(int pagamentoId, string emailDestinatario)
        {
            var pagamento = await _paymentService.GetPaymentByIdAsync(pagamentoId);
            if (pagamento == null)
            {
                _applicationLog.LogAsync($"Payment with ID {pagamentoId} not found for reminder.", HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value ?? "Email não encontrado", HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role)?.Value ?? "Role não encontrada");
                return NotFound("Pagamento não encontrado.");
            }

            string subject = "Lembrete: Pagamento do Boleto Prestes a Vencer";
            string body = $@"
                <h1>Lembrete de Pagamento</h1>
                <p>Prezado(a),</p>
                <p>Este é um lembrete de que o seu boleto com o valor de <strong>{pagamento.Valor:C}</strong> está prestes a vencer.</p>
                <p>Data de Vencimento: {pagamento.Data.AddDays(5):dd/MM/yyyy}</p>
                <p>Favor realizar o pagamento o mais breve possível para evitar quaisquer penalidades.</p>
                <p>Atenciosamente,<br/>Equipe KK Imobiliária</p>";

            var result = await _emailSender.SendEmailAsync(emailDestinatario, subject, body);
            _applicationLog.LogAsync($"Payment reminder sent to {emailDestinatario} for payment ID {pagamentoId}.", HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value ?? "Email não encontrado", HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role)?.Value ?? "Role não encontrada");
            return Ok(result);
        }
    }
}
