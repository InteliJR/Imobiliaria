using Layer.Domain.Entites;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Layer.Domain.Interfaces
{
    public interface IChamadosRepository
    {
        Task<Chamados> GetByIdAsync(int id);
        Task<List<Chamados>> GetAllAsync();
        Task<Chamados> AddAsync(Chamados chamado);
        Task<int> UpdateAsync(Chamados chamado);
        Task<int> DeleteAsync(int id);
        Task<IEnumerable<Chamados>> GetByImovelIdAsync(int imovelId);
        Task<int> DeleteByImovelIdAsync(int imovelId);
    }
}
