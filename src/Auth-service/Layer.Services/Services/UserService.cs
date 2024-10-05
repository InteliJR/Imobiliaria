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

        public async Task<User> GetUserByCPF(string cpf)
        {
            // Chekar se o usuário existe, em cada tabela locadores, locatários e juridico
            var locadorCheck = await _dbcontext.Locadores.FirstOrDefaultAsync(x => x.CPF == cpf);
            // var locatarioCheck = await _dbcontext.Locatarios.FirstOrDefaultAsync(x => x.CPF == cpf);
            // var juridicoCheck = await _dbcontext.Juridicos.FirstOrDefaultAsync(x => x.CNPJ == cpf);

            if (locadorCheck != null)
            {
                return await _dbcontext.Usuarios.FirstOrDefaultAsync(x => x.UsuarioId == locadorCheck.UsuarioId);
            }
            // else if (locatarioCheck != null)
            // {
            //     return await _dbcontext.Usuarios.FirstOrDefaultAsync(x => x.UsuarioId == locatarioCheck.UsuarioId);
            // }
            // else if (juridicoCheck != null)
            // {
            //     return await _dbcontext.Usuarios.FirstOrDefaultAsync(x => x.UsuarioId == juridicoCheck.UsuarioId);
            // }
            else
            {
                return null;
            }

        }

        public async Task<User> GetUsserById(int userId)
        {
            return await _dbcontext.Usuarios.FirstOrDefaultAsync(x => x.UsuarioId == userId);
        }

        public async Task<User> UpdateUser(User userToUpdate)
        {
            _dbcontext.Usuarios.Update(userToUpdate);
            await _dbcontext.SaveChangesAsync();
            return userToUpdate;
        }

        public async Task<User> DeleteUser(User userToDelete)
        {
            _dbcontext.Usuarios.Remove(userToDelete);
            await _dbcontext.SaveChangesAsync();
            return userToDelete;
        }

        public async Task<bool> LastUpdate(int UserId)
        {
            var user = await _dbcontext.Usuarios.FirstOrDefaultAsync(x => x.UsuarioId == UserId);

            if (user == null)
            {
                return false;
            }

            user.DataAtualizacao = DateTime.UtcNow;

            _dbcontext.Usuarios.Update(user);

            await _dbcontext.SaveChangesAsync();

            return true;
        }
    }
}
