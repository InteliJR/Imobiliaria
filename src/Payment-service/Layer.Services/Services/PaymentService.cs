using Layer.Domain.Entities;
using Layer.Domain.Interfaces;
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

        public async Task<IEnumerable<Payment>> GetAllPaymentsByIdImovel(int imovelid)
        {
            var contratos = new Contratos();
            var contratoId = contratos.ContratoId;

            var payments = await _context.Pagamentos
                .Join(_context.Contratos,
                        payment => payment.ContratoId,
                        contrato => contrato.ContratoId,
                        (payment, contrato) => new { Payment = payment, Contrato = contrato })
                .Where(pc => pc.Contrato.ImovelId == imovelid)
                .Select(pc => pc.Payment)
                .ToListAsync();

            if (!payments.Any())
            {
                throw new KeyNotFoundException("No payments found for this locatarioId");
            }

            return payments;
        }

        public async Task<Payment> GetPaymentByIdAsync(int id)
        {
            var payment = await _context.Pagamentos.FindAsync(id);
            if (payment == null)
            {
                throw new Exception("Payment not found.");
            }
            return payment;
        }
        public async Task AddPaymentAsync(Payment payment)
        {   
            try{
                _context.Pagamentos.Add(payment);
                await _context.SaveChangesAsync();
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
