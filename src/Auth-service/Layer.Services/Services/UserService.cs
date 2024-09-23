using Layer.Domain.Entities;
using Layer.Domain.Interfaces;
using Layer.Infrastructure;
using Layer.Infrastructure.Database;
using Layer.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Data;

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

        public async Task<List<User>> GetUsuariosAsync()
        {

            return await _dbcontext.Usuarios.AsNoTracking().ToListAsync();
        }

        public async Task<User> InsertNewUser(User user)
        {
            await _dbcontext.Usuarios.AddAsync(user);
            await _dbcontext.SaveChangesAsync();
            return user;
        }
    }
}
