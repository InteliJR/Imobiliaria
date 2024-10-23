using Layer.Domain.Entities;
using Layer.Domain.Interfaces;
using Layer.Infrastructure.Database;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Layer.Services.Services
{
    public class LocatarioService : ILocatarioService
    {

        private readonly AppDbContext _dbcontext;
        private readonly IUserService _userService;

        public LocatarioService(AppDbContext dbContext, IUserService userService)
        {
            _dbcontext = dbContext;
            _userService = userService;
        }

        public async Task<List<Locatario>> GetAllLocatariosAsync()
        {
            try
            {
                return await _dbcontext.Locatarios.ToListAsync();
            } catch (Exception ex)
            {
                throw new Exception("Ocorreu um erro ao buscar os Locatarios no banco de dados.", ex);
            }
        }

        public async Task<Locatario> GetLocatarioByEmail(string email)
        {
            try
            {
                // Pegar na tabela usuário o usuário com esse email e verificar se o IdUsuario está na tabela Locatario

                User user = await _dbcontext.Usuarios.FirstOrDefaultAsync(x => x.Email == email);

                if (user == null)
                {
                    return null;
                }

                return await _dbcontext.Locatarios.FirstOrDefaultAsync(x => x.UsuarioId == user.UsuarioId);
            } catch (Exception ex)
            {

               throw new Exception("Ocorreu um erro ao buscar o Locatario no banco de dados.", ex);
            }
        }

        public async Task<bool> LocatarioExist(string locatarioCPF)
        {
            try
            {
                var userCheck = await _dbcontext.Locatarios.FirstOrDefaultAsync(x => x.CPF == locatarioCPF);

                if (userCheck == null)
                {
                    return false;
                }
                else
                {
                    return true;
                }
            } catch (Exception ex)
            {
                throw new Exception("Ocorreu um erro ao verificar se o Locatario existe no banco de dados.", ex);
            }
               

        }

        public async Task<Locatario> GetLocatarioByUserId(int userId)
        {
            try
            {
                // Checar se existe um usuário

                if (await _dbcontext.Usuarios.FirstOrDefaultAsync(x => x.UsuarioId == userId) == null)
                {
                    throw new Exception("Usuário não encontrado.");
                }

                var Locatario = await _dbcontext.Locatarios.FirstOrDefaultAsync(x => x.UsuarioId == userId);
                if (Locatario == null)
                {
                    throw new Exception("Locatario não encontrado.");
                }

                return Locatario;
            } catch (Exception ex)
            {
                throw new Exception("Ocorreu um erro ao buscar o Locatario no banco de dados.", ex);
            }
        }

        public async Task<Locatario> InsertNewLocatario(Locatario Locatario)
        {
            try
            {
                await _dbcontext.Locatarios.AddAsync(Locatario);
                await _dbcontext.SaveChangesAsync();

                return Locatario;
            } catch (Exception ex)
            {
                throw new Exception("Ocorreu um erro ao inserir o Locatario no banco de dados.", ex);
            }
        }

        public async Task<bool> UserAlreadyLinkedLocatario(int userId)
        {
            try
            {
                var Locatario = await _dbcontext.Locatarios.FirstOrDefaultAsync(x => x.UsuarioId == userId);

                if (Locatario == null)
                {
                    return false;
                }
                else
                {
                    return true;
                }
            } catch (Exception ex)
            {
                throw new Exception("Ocorreu um erro ao verificar se o usuário já está vinculado a um Locatario.", ex);
            }
        }

        public async Task<Locatario> GetLocatarioByLocatarioID(int LocatarioID)
        {
            try
            {
                var Locatario = await _dbcontext.Locatarios.FirstOrDefaultAsync(x => x.LocatarioId == LocatarioID);

                if (Locatario == null)
                {
                    throw new Exception("Locatario não encontrado.");
                }

                return Locatario;
            }
            catch (Exception ex)
            {
                throw new Exception("Ocorreu um erro ao buscar o Locatario no banco de dados.", ex);
            }
        }

        public async Task<Locatario> UpdateLocatario(Locatario Locatario)
        {
            try
            {
                _dbcontext.Locatarios.Update(Locatario);
                await _dbcontext.SaveChangesAsync();

                await _userService.LastUpdate(Convert.ToInt32(Locatario.UsuarioId));

                return Locatario;
            } catch (Exception ex)
            {
                throw new Exception("Ocorreu um erro ao atualizar o Locatario no banco de dados.", ex);
            }

        }

        public async Task<Locatario> DeleteLocatario(string CPF)
        {
            try
            {
                var Locatario = await _dbcontext.Locatarios.FirstOrDefaultAsync(x => x.CPF == CPF);

                if (Locatario == null)
                {
                    throw new Exception("Locatario não encontrado.");
                }

                _dbcontext.Locatarios.Remove(Locatario);
                await _dbcontext.SaveChangesAsync();

                return Locatario;
            } catch (Exception ex)
            {
                throw new Exception("Ocorreu um erro ao deletar o Locatario no banco de dados.", ex);
            }
        }

    }
}
