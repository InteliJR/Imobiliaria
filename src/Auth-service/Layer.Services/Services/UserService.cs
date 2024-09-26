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
        private readonly AppDbContext _dbcontext;

        // Constructor
        public UserService(AppDbContext dbcontext)
        {
            _dbcontext = dbcontext;
        }

        public async Task<List<User>> GetUsuariosAsync()
        {
            try
            {
                return await _dbcontext.Usuarios.AsNoTracking().ToListAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao obter os usuários: {ex.Message}");

                throw new Exception("Ocorreu um erro ao buscar os usuários no banco de dados.", ex);
            }
        }


        public async Task<User> InsertNewUser(User user)
        {
            await _dbcontext.Usuarios.AddAsync(user);
            await _dbcontext.SaveChangesAsync();
            return user;
        }

        public async Task<bool> UserExist(User user)
        {
            var userCheck = await _dbcontext.Usuarios.FirstOrDefaultAsync(x => x.Email == user.Email);
            
            if (userCheck == null)
            {
                return false;
            }else{
                return true;
            }
        }

        public async Task<User> GetUserByEmail(string email)
        {
            return await _dbcontext.Usuarios.FirstOrDefaultAsync(x => x.Email == email);
        }
    }
}
