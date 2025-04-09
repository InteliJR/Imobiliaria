using Layer.Domain.Entities;
using Layer.Domain.Interfaces;
using Layer.Domain.DTO;
using Layer.Infrastructure;
using Layer.Infrastructure.Database;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Data;
using System;
using System.Linq;
using System.Text;


namespace Layer.Services.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly AppDbContext _context;

        public PaymentService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Payment>> GetAllPaymentsAsync()
        {
            return await _context.Pagamentos.ToListAsync();
        }

        public async Task<IEnumerable<GetPaymentDTO>> GetAllPaymentsByIdImovel(int imovelid)
        {
            var contratos = new Contratos();
            var contratoId = contratos.ContratoId;

            var payments = await _context.Pagamentos
                .Join(_context.Contratos,
                    payment => payment.ContratoId,
                    contrato => contrato.ContratoId,
                    (payment, contrato) => new { Payment = payment, Contrato = contrato })
                .Where(pc => pc.Contrato.ImovelId == imovelid)
                .ToListAsync();

            if (!payments.Any())
                return new List<GetPaymentDTO>();

            var paymentsDTO = payments.Select(pc => new GetPaymentDTO
            {
                PaymentId = pc.Payment.PaymentId,
                ContratoId = pc.Payment.ContratoId,
                Valor = pc.Payment.Valor,
                Data = pc.Payment.Data,
                Pagante = pc.Payment.Pagante,
                MetodoPagamento = pc.Payment.MetodoPagamento,
                Descricao = pc.Payment.Descricao,
                TipoPagamento = pc.Payment.TipoPagamento,
                Multa = pc.Payment.Multa,
                ValorMulta = pc.Payment.ValorMulta,
                ValorAluguel = pc.Contrato.ValorAluguel,
                Iptu = pc.Contrato.Iptu,
                TaxaAdministratia = pc.Contrato.TaxaAdm,
                ImovelId = pc.Contrato.ImovelId
            });

            return paymentsDTO;
        }

        public async Task<GetPaymentDTO> GetPaymentByIdAsync(int id)
        {
            var payment = await _context.Pagamentos
                .Include(p => p.Contrato)
                .FirstOrDefaultAsync(p => p.PaymentId == id);

            if (payment == null)
            {
                throw new Exception("Payment not found.");
            }

            var paymentDto = new GetPaymentDTO
            {
                PaymentId = payment.PaymentId,
                ContratoId = payment.ContratoId,
                Valor = payment.Valor,
                Data = payment.Data,
                Pagante = payment.Pagante,
                MetodoPagamento = payment.MetodoPagamento,
                Descricao = payment.Descricao,
                TipoPagamento = payment.TipoPagamento,
                Multa = payment.Multa,
                ValorMulta = payment.ValorMulta,
                ValorAluguel = payment.Contrato.ValorAluguel,
                Iptu = payment.Contrato.Iptu,
                TaxaAdministratia = payment.Contrato.TaxaAdm,
                ImovelId = payment.Contrato.ImovelId
            };

            return paymentDto;
        }


        public async Task<Payment> AddPaymentAsync(Payment payment)
        {   
            try{
                _context.Pagamentos.Add(payment);
                await _context.SaveChangesAsync();
                return payment;
            }
            catch (Exception ex){
                throw new Exception("Error adding payment: " + ex.Message);
            }
        }

        public async Task UpdatePaymentAsync(Payment payment)
        {
            _context.Pagamentos.Update(payment);
            await _context.SaveChangesAsync();
        }

        public async Task DeletePaymentAsync(int id)
        {
            var payment = await _context.Pagamentos.FindAsync(id);
            if (payment != null)
            {
                _context.Pagamentos.Remove(payment);
                await _context.SaveChangesAsync();
            }
            else
            {
                throw new Exception("Payment not found.");
            }
        }
        public async Task<IEnumerable<Payment>> GetPaymentsDueByDateAsync(DateTime dueDate)
        {
            return await _context.Pagamentos.Where(p => p.Data.Date == dueDate.Date).ToListAsync();
        }

    }
}
