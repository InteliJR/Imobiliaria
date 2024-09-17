using Layer.Domain.Entities;
using Layer.Domain.Interfaces;
using Layer.Infrastructure;
using Layer.Infrastructure.Database;
using Layer.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Layer.Services.Services
{
    public class UserService : IUserService
    {

        // Vamo adicionar o contexto do banco de dados
        private readonly ApplicationDbContext _dbcontext;

        // Constructor
        public UserService(ApplicationDbContext dbcontext)
        {
            _dbcontext = dbcontext;
        }

        public Task<List<User>> GetUsuariosAsync()
        {
            return _dbcontext.Usuarios.ToListAsync(); // Retornando a lista de usuarios de maneira assincrona
        }
    }
}
