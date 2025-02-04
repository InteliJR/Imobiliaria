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
        Task<Contratos> AddAsyncWithMultipleFiles(Contratos contrato, IFormFileCollection files);
        Task<int> UpdateAsync(int id, Contratos contrato);
        Task<int> DeleteAsync(int id);
        Task<List<string>> GenerateSignedUrlsOfPdfsAsync(List<string> objectNames);
        Task<List<Contratos>> ObterContratosProximosReajusteAsync();
        Task<List<Contratos>> GetContratosParaReajusteAsync(CancellationToken cancellationToken);
        Task AplicarReajusteAsync(Contratos contrato, CancellationToken cancellationToken);
        Task<Contratos> GetByIdContratoAsync(int id);
        Task<List<Contratos>> GetByImovelIdAsync(int imovelId);
    }
}
