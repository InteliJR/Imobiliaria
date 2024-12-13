using Layer.Domain.Entities;
using Layer.Domain.Interfaces;
using Layer.Infrastructure;
using Layer.Infrastructure.Database;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Http;
using Microsoft.VisualBasic;
using System;
using System.Linq;
using System.Text;

namespace Layer.Services.Services
{
    public class ImoveisService : IimoveisRepository
    {

        // Vamo adicionar o contexto do banco de dados
        private readonly ApplicationDbContext _dbcontext;
        private readonly GoogleCloudStorageService _storageService;

        // Constructor
        public ImoveisService(ApplicationDbContext dbcontext)
        {
            _dbcontext = dbcontext;
            string filePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "administradora-kk-firebase-adminsdk-1fa3k-7b4c700bd8.json");
            //var credentialsPath = @"C:\Users\Inteli\Desktop\Imobiliaria\src\Property-service\Layer.Application\imobiliaria-kk-firebase-adminsdk-f1416-d5111edc74.json";
            var bucketName = "administradora-kk.appspot.com"; // Substitua pelo nome correto do seu bucket
            _storageService = new GoogleCloudStorageService(filePath, bucketName);
        }

        public async Task<int> DeleteImoveisAsync(int id)
        {
            var imovel = await _dbcontext.Imoveis.FindAsync(id);

            if (imovel == null)
            {
                return 0;
            }

            _dbcontext.Imoveis.Remove(imovel);
            return await _dbcontext.SaveChangesAsync();
        }

        public async Task<Imoveis> GetByIdImoveisAsync(int id)
        {
            return await _dbcontext.Imoveis.FindAsync(id);
        }

        public Task<List<Imoveis>> GetImoveisAsync()
        {
            return _dbcontext.Imoveis.ToListAsync(); // Retornando a lista de imoveis de maneira assincrona
        }

        public async Task<Imoveis> PostImoveisAsync(Imoveis imoveis)
        {
            await _dbcontext.Imoveis.AddAsync(imoveis);
            await _dbcontext.SaveChangesAsync();
            return imoveis;

        }

        public async Task<int> UpdateImoveisAsync(int id, Imoveis imovelAtualizado)
        {
            var imovel = await _dbcontext.Imoveis.FindAsync(id);

            if (imovel == null)
            {
                return 0;
            }

            imovel.TipoImovel = imovelAtualizado.TipoImovel;
            imovel.Cep = imovelAtualizado.Cep;
            imovel.Condominio = imovelAtualizado.Condominio;
            imovel.ValorImovel = imovelAtualizado.ValorImovel;
            imovel.Bairro = imovelAtualizado.Bairro;
            imovel.Descricao = imovelAtualizado.Descricao;
            imovel.Endereco = imovelAtualizado.Endereco;
            imovel.Complemento = imovelAtualizado.Complemento;

            _dbcontext.Imoveis.Update(imovel);
            return await _dbcontext.SaveChangesAsync();
        }

        public async Task<Imoveis> AddImoveisWithPhotosAsync(Imoveis imovel, IFormFileCollection files)
        {
            var fotos = new List<string>();

            if (files != null && files.Count > 0)
            {
                foreach (var file in files)
                {
                    if (file.Length > 0)
                    {
                        // Gerar caminho temporário para o arquivo
                        var tempFilePath = Path.GetTempFileName();
                        
                        // Salvar temporariamente no servidor
                        using (var stream = new FileStream(tempFilePath, FileMode.Create))
                        {
                            await file.CopyToAsync(stream);
                        }

                        // Fazer upload para o Firebase Storage
                        var objectName = $"imoveis/{Guid.NewGuid()}_{file.FileName}";

                        // Adicionar URL pública à lista de fotos
                        // fotos.Add(publicUrl);
                        var publicUrl = await _storageService.UploadFileAsync(tempFilePath, objectName);

                        fotos.Add(publicUrl);
                    }
                }

                // Adiciona URLs ao objeto imóvel
                imovel.Fotos = string.Join(";", fotos); // Salva como string separada por ";" no banco de dados
            }

            await _dbcontext.Imoveis.AddAsync(imovel);
            await _dbcontext.SaveChangesAsync();
            return imovel;
        }

        public async Task<string> UpdateImovelPhotoAsync(int id, string tempFilePath, string objectName)
        {
            var imovel = await _dbcontext.Imoveis.FindAsync(id);

            if (imovel == null)
            {
                throw new Exception("Imóvel não encontrado.");
            }

            // Fazer upload para o Firebase Storage
            var publicUrl = await _storageService.UploadFileAsync(tempFilePath, objectName);

            // Atualizar o registro no banco de dados
            imovel.Fotos = publicUrl;
            _dbcontext.Imoveis.Update(imovel);
            await _dbcontext.SaveChangesAsync();

            return publicUrl;
        }

        //Lógica para pegar o imóvel de determinado id de locador
        public async Task<IEnumerable<Imoveis>> GetImoveisByIdLocador (int locadorId)
        {
            return await _dbcontext.Imoveis.Where(c => c.LocadorId == locadorId).ToListAsync();
        }

        //Lógica para pegar o imóvel de determinado id de locatário
        public async Task<IEnumerable<Imoveis>> GetImoveisByIdLocatario (int locatarioId)
        {
            return await _dbcontext.Imoveis.Where(c => c.LocatarioId == locatarioId).ToListAsync();
        }
    }
}