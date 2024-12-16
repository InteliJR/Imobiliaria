using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Layer.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

using System.Collections.Generic;
using System.Threading.Tasks;
using Layer.Domain.Entities;

namespace Layer.Domain.Interfaces
{
    public interface IPaymentService
    {
        Task<IEnumerable<Payment>> GetAllPaymentsAsync();
        Task<Payment> GetPaymentByIdAsync(int id);
        Task<IEnumerable<Payment>> GetPaymentsDueByDateAsync(DateTime dueDate);
        Task AddPaymentAsync(Payment payment);
        Task UpdatePaymentAsync(Payment payment);
        Task DeletePaymentAsync(int id);
        Task<IEnumerable<Payment>> GetAllPaymentsByIdImovel(int imovelid);
    }
}
