using Layer.Domain.Entities;
using Layer.Domain.Interfaces;
using Layer.Infrastructure;
using Layer.Infrastructure.Database;
using Layer.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Data;
using System;
using System.Linq;
using System.Text;


namespace Layer.Services.Services
{
    public class UserService : IUserService
    {

        // Vamo adicionar o contexto do banco de dados
        private readonly AppDbContext _dbcontext;

        public UserService(AppDbContext dbcontext)
        {
            _dbcontext = dbcontext;
        }

        private static string RandomString(int length)
        {

            var random = new Random();

            const string pool = "abcdefghijklmnopqrstuvwxyz0123456789";
            var chars = Enumerable.Range(0, length)
                .Select(x => pool[random.Next(0, pool.Length)]);
            return new string(chars.ToArray());
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


        public async Task<User> InsertNewUser(User user, bool generatePassword)
        {
            // Criar senha aleatória
            if (generatePassword)
            {
                string password = RandomString(8);

                user.Senha = password;

                // Hashing da senha

                // user.Senha = await hashingPasswordService.HashPassword(password);
            }

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


        public async Task<User> UpdateUser(User userToUpdate)
        {
            _dbcontext.Usuarios.Update(userToUpdate);
            await _dbcontext.SaveChangesAsync();
            return userToUpdate;
        }

        public async Task<User> DeleteUser(string email)
        {
            var user = await _dbcontext.Usuarios.FirstOrDefaultAsync(x => x.Email == email);

            if (user == null)
            {
                return null;
            }

            _dbcontext.Usuarios.Remove(user);
            await _dbcontext.SaveChangesAsync();

            return user;
        }

    }
}
