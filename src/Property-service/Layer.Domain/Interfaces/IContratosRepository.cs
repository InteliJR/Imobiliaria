using Layer.Domain.Entites;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Layer.Domain.Interfaces
{
    public interface IContratosRepository
    {
        Task<Contratos> GetByIdAsync(int id);
        Task<List<Contratos>> GetAllAsync();
        Task<Contratos> AddAsync(Contratos contrato, IFormFile file);
        Task<int> UpdateAsync(int id, Contratos contrato);
        Task<int> DeleteAsync(int id);
    }
}
