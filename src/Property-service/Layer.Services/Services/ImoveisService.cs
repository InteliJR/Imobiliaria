using Layer.Domain.Entities;
using Layer.Domain.Interfaces;
using Layer.Infrastructure;
using Layer.Infrastructure.Database;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Layer.Services.Services
{
    public class ImoveisService : Iimoveis
    {

        // Vamo adicionar o contexto do banco de dados
        private readonly ApplicationDbContext _dbcontext;

        // Constructor
        public ImoveisService(ApplicationDbContext dbcontext)
        {
            _dbcontext = dbcontext;
        }
        public Task<List<Imoveis>> GetImoveisAsync()
        {
            return _dbcontext.Imoveis.ToListAsync(); // Retornando a lista de imoveis de maneira assincrona
        }
    }
}