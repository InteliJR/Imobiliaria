using Layer.Domain.Entities;
using Layer.Domain.Interfaces;
using Layer.Infrastructure;
using Layer.Infrastructure.Database;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Layer.Services.Services
{
    public class ImoveisService : IimoveisRepository
    {

        // Vamo adicionar o contexto do banco de dados
        private readonly ApplicationDbContext _dbcontext;

        // Constructor
        public ImoveisService(ApplicationDbContext dbcontext)
        {
            _dbcontext = dbcontext;
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
    }
}