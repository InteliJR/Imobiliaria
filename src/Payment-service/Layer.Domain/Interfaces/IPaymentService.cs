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
using Layer.Domain.DTO;

namespace Layer.Domain.Interfaces
{
    public interface IPaymentService
    {
        Task<IEnumerable<Payment>> GetAllPaymentsAsync();
        Task<GetPaymentDTO> GetPaymentByIdAsync(int id);
        Task<IEnumerable<Payment>> GetPaymentsDueByDateAsync(DateTime dueDate);
        Task<Payment> AddPaymentAsync(Payment payment);
        Task UpdatePaymentAsync(Payment payment);
        Task DeletePaymentAsync(int id);
        Task<IEnumerable<GetPaymentDTO>> GetAllPaymentsByIdImovel(int imovelid);
    }
}
