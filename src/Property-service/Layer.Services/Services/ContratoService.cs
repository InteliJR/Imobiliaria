using Layer.Domain.Entites;
using Layer.Domain.Interfaces;
using Layer.Infrastructure.Database;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Layer.Services.Services
{
    public class ContratoService : IContratosRepository
    {
        private readonly ApplicationDbContext _dbcontext;
        private readonly GoogleCloudStorageService _storageService;

        public ContratoService(ApplicationDbContext dbcontext)
        {
            _dbcontext = dbcontext;
            string filePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "imobiliaria-kk-firebase-adminsdk-f1416-d5111edc74.json");
            //var credentialsPath = @"C:\Users\Inteli\Desktop\Imobiliaria\src\Property-service\Layer.Application\imobiliaria-kk-firebase-adminsdk-f1416-d5111edc74.json";
            var bucketName = "imobiliaria-kk.appspot.com"; // Substitua pelo nome correto do seu bucket
            _storageService = new GoogleCloudStorageService(filePath, bucketName);
        }

        public async Task<Contratos> AddAsync(Contratos contrato, IFormFile file)
        {
            if (file != null && file.Length > 0)
            {
                var tempFilePath = Path.GetTempFileName();
                using (var stream = new FileStream(tempFilePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                var objectName = $"uploads/{file.FileName}";
                var publicUrl = await _storageService.UploadFileAsync(tempFilePath, objectName);

                contrato.Documentos = publicUrl;
            }

            await _dbcontext.Contratos.AddAsync(contrato);
            await _dbcontext.SaveChangesAsync();
            return contrato;
        }

        public async Task<Contratos> GetByIdAsync(int id)
        {
            return await _dbcontext.Contratos.FindAsync(id);
        }

        public async Task<List<Contratos>> GetAllAsync()
        {
            return await _dbcontext.Contratos.ToListAsync();
        }
        public async Task UpdateAsync(Contratos contrato)
        {
            _dbcontext.Contratos.Update(contrato);
            await _dbcontext.SaveChangesAsync();
        }

        public async Task<int> DeleteAsync(int id)
        {
            var contrato = await _dbcontext.Contratos.FindAsync(id);
            if (contrato == null)
            {
                return 0;
            }

            _dbcontext.Contratos.Remove(contrato);
            return await _dbcontext.SaveChangesAsync();
        }
        public async Task<int> UpdateAsync(int id, Contratos contratoAtualizado)
        {
            // Busca o contrato pelo id
            var contrato = await _dbcontext.Contratos.FindAsync(id);

            // Verifica se o contrato existe
            if (contrato == null)
            {
                return 0; // Retorna 0 se não encontrado
            }

            // Atualiza os campos do contrato
            contrato.Documentos = contratoAtualizado.Documentos;
            contrato.ValorAluguel = contratoAtualizado.ValorAluguel;
            contrato.DataInicio = contratoAtualizado.DataInicio;
            contrato.DataEncerramento = contratoAtualizado.DataEncerramento;
            contrato.LocadorId = contratoAtualizado.LocadorId;
            contrato.LocatarioId = contratoAtualizado.LocatarioId;
            contrato.ImovelId = contratoAtualizado.ImovelId;
            contrato.TipoGarantia = contratoAtualizado.TipoGarantia;
            contrato.CondicoesEspeciais = contratoAtualizado.CondicoesEspeciais;
            contrato.Status = contratoAtualizado.Status;
            contrato.Iptu = contratoAtualizado.Iptu;
            contrato.DataPagamento = contratoAtualizado.DataPagamento;
            contrato.TaxaAdm = contratoAtualizado.TaxaAdm;
            contrato.DataRescisao = contratoAtualizado.DataRescisao;
            contrato.Renovado = contratoAtualizado.Renovado;
            contrato.DataEncerramentoRenovacao = contratoAtualizado.DataEncerramentoRenovacao;
            contrato.ValorReajuste = contratoAtualizado.ValorReajuste;

            // Marca a entidade como atualizada
            _dbcontext.Contratos.Update(contrato);

            // Salva as mudanças e retorna o número de registros afetados
            return await _dbcontext.SaveChangesAsync();
        }
    }
}
