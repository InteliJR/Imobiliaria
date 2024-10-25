using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Layer.Domain.Entities;
using Layer.Domain.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Layer.Domain.DTO;
using Microsoft.AspNetCore.Mvc;
using Layer.Domain.Entities;
using Layer.Domain.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Layer.Application.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentController : ControllerBase
    {
        private readonly IPaymentService _paymentService;

        public PaymentController(IPaymentService paymentService)
        {
            _paymentService = paymentService;
        }

        // GET: api/payment
        [HttpGet("listarpagamentos")]
        public async Task<ActionResult<IEnumerable<Payment>>> GetAllPayments()
        {
            var payments = await _paymentService.GetAllPaymentsAsync();
            return Ok(payments);
        }

        // GET: api/payment/{id}
        [HttpGet("pagamentos/{id}")]
        public async Task<ActionResult<Payment>> GetPaymentById(int id)
        {
            var payment = await _paymentService.GetPaymentByIdAsync(id);
            if (payment == null)
            {
                return NotFound();
            }
            return Ok(payment);
        }

        // POST: api/payment
        [HttpPost("criarpagamentos")]
        public async Task<ActionResult<Payment>> AddPayment([FromBody] CreatePaymentDTO paymentDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Mapeamento manual do DTO para a entidade Payment
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
            return CreatedAtAction(nameof(GetPaymentById), new { id = payment.PaymentId }, payment);
        }

        // PUT: api/payment/{id}
        [HttpPut("atualizarpagamento/{id}")]
        public async Task<IActionResult> UpdatePayment(int id, [FromBody] CreatePaymentDTO paymentDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Buscar o pagamento existente
            var existingPayment = await _paymentService.GetPaymentByIdAsync(id);
            if (existingPayment == null)
            {
                return NotFound();
            }

            // Atualizar as propriedades permitidas
            existingPayment.ContratoId = paymentDto.ContratoId;
            existingPayment.Valor = paymentDto.Valor;
            existingPayment.Data = paymentDto.Data;
            existingPayment.Pagante = paymentDto.Pagante;
            existingPayment.MetodoPagamento = paymentDto.MetodoPagamento;
            existingPayment.Descricao = paymentDto.Descricao;
            existingPayment.TipoPagamento = paymentDto.TipoPagamento;
            existingPayment.Multa = paymentDto.Multa;
            existingPayment.ValorMulta = paymentDto.ValorMulta;

            await _paymentService.UpdatePaymentAsync(existingPayment);

            return NoContent();
        }
        // DELETE: api/payment/{id}
        [HttpDelete("excluirpagamento/{id}")]
        public async Task<IActionResult> DeletePayment(int id)
        {
            var payment = await _paymentService.GetPaymentByIdAsync(id);
            if (payment == null)
            {
                return NotFound();
            }

            await _paymentService.DeletePaymentAsync(id);
            return NoContent();
        }
    }
}
