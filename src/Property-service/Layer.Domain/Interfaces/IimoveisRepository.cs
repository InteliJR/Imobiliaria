using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Layer.Domain.Entities;

namespace Layer.Domain.Interfaces
{
    public interface IimoveisRepository
    {
        Task<List<Imoveis>> GetImoveisAsync();
        Task<Imoveis> GetByIdImoveisAsync(int id);
        Task<Imoveis> PostImoveisAsync(Imoveis imovel);
        Task<int> UpdateImoveisAsync(int id, Imoveis imovel);
        Task<int> DeleteImoveisAsync(int id);
    }
}