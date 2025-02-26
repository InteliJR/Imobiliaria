using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Layer.Domain.Entities;
using Layer.Domain.DTO;
using System.Collections.Generic;
using System.Threading.Tasks;

using System.Collections.Generic;
using System.Threading.Tasks;
using Layer.Domain.Entities;
using Microsoft.AspNetCore.Http;
using System.Diagnostics.Contracts;

namespace Layer.Domain.Interfaces
{
    public interface IRentService
    {
        Task<IEnumerable<Rent>> GetAllRentsAsync();
        Task<Rent> GetRentByIdAsync(int id);
        Task<IEnumerable<Rent>> GetRentsDueByDateAsync(DateTime dueDate);
        Task<Rent> AddRentAsync(Rent rent);
        Task<Rent> UpdateRentAsync(Rent rent);
        Task DeleteRentAsync(int id);
        Task<IEnumerable<Rent>> GetAllRentsByIdImovel(int imovelid);
        Task<IEnumerable<Rent>> GetAllRentsByIdLocatario(int locatarioid);
        Task<IEnumerable<Rent>> GetAllRentsByIdLocador(int locadorid);
        Task<IEnumerable<Rent>> GetAllRentsByContractId(int contractid);
        Task<Rent> GetAllRentByPaymentId(int paymentid);
        Task<Rent> UpdateRentToPaidAsync(int Rentid, int Paymentid, IFormFileCollection file);
        Task<List<Rent>> CreateRentNextMonthAsync(int contratoId, int numberOfMonthsAhead);
        Task<Contratos> ContractById(int contractId);
        Task<IEnumerable<RentsWithPayment>> GetAllRentsWithPaymentsByIdImovel(int imovelid);
        Task<IEnumerable<RentsWithPayment>> GetAllRentsWithPaymentsByContractId(int contractId);
        Task<string> GenerateSignedUrlOfContractsAsync(string objectName);
        Task<IEnumerable<RentAndContractInfoDTO>> GetAlugueisQueVencemEmXdias(int days);
        Task<int> GetContractIdByImovelId(int imovelId);
    }
}
