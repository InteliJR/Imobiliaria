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
    }
}
