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
    public class LocadorService : ILocadorService
    {

        private readonly AppDbContext _dbcontext;

        public LocadorService(AppDbContext dbContext)
        {
            _dbcontext = dbContext;
        }

        public async Task<List<Locador>> GetAllLocadorsAsync()
        {
            try
            {
                return await _dbcontext.Locadores.ToListAsync();
            } catch (Exception ex)
            {
                throw new Exception("Ocorreu um erro ao buscar os locadores no banco de dados.", ex);
            }
        }

        public async Task<Locador> GetLocadorByEmail(string email)
        {
            try
            {
                // Pegar na tabela usuário o usuário com esse email e verificar se o IdUsuario está na tabela Locador

                User user = await _dbcontext.Usuarios.FirstOrDefaultAsync(x => x.Email == email);

                if (user == null)
                {
                    return null;
                }

                return await _dbcontext.Locadores.FirstOrDefaultAsync(x => x.UsuarioId == user.UsuarioId);
            } catch (Exception ex)
            {

               throw new Exception("Ocorreu um erro ao buscar o locador no banco de dados.", ex);
            }
        }
        

        public async Task<bool> LocadorExist(string locadorCPF)
        {
            try
            {
                var userCheck = await _dbcontext.Locadores.FirstOrDefaultAsync(x => x.CPF == locadorCPF);

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
                throw new Exception("Ocorreu um erro ao verificar se o locador existe no banco de dados.", ex);
            }
               

        }

        public async Task<Locador> GetLocadorByUserId(int userId)
        {
            try
            {
                // Checar se existe um usuário

                if (await _dbcontext.Usuarios.FirstOrDefaultAsync(x => x.UsuarioId == userId) == null)
                {
                    throw new Exception("Usuário não encontrado.");
                }

                var locador = await _dbcontext.Locadores.FirstOrDefaultAsync(x => x.UsuarioId == userId);
                if (locador == null)
                {
                    throw new Exception("Locador não encontrado.");
                }

                return locador;
            } catch (Exception ex)
            {
                throw new Exception("Ocorreu um erro ao buscar o locador no banco de dados.", ex);
            }
        }

        public async Task<Locador> InsertNewLocador(Locador locador)
        {
            try
            {
                await _dbcontext.Locadores.AddAsync(locador);
                await _dbcontext.SaveChangesAsync();

                return locador;
            } catch (Exception ex)
            {
                throw new Exception("Ocorreu um erro ao inserir o locador no banco de dados.", ex);
            }
        }

        public async Task<bool> UserAlreadyLinkedLocador(int userId)
        {
            try
            {
                var locador = await _dbcontext.Locadores.FirstOrDefaultAsync(x => x.UsuarioId == userId);

                if (locador == null)
                {
                    return false;
                }
                else
                {
                    return true;
                }
            } catch (Exception ex)
            {
                throw new Exception("Ocorreu um erro ao verificar se o usuário já está vinculado a um locador.", ex);
            }
        }

        public async Task<Locador> GetLocadorByLocadorID(int locadorID)
        {
            try
            {
                var locador = await _dbcontext.Locadores.FirstOrDefaultAsync(x => x.LocadorId == locadorID);

                if (locador == null)
                {
                    throw new Exception("Locador não encontrado.");
                }

                return locador;
            }
            catch (Exception ex)
            {
                throw new Exception("Ocorreu um erro ao buscar o locador no banco de dados.", ex);
            }
        }

        public async Task<Locador> UpdateLocador(Locador locador)
        {
            try
            {
                _dbcontext.Locadores.Update(locador);
                await _dbcontext.SaveChangesAsync();

                return locador;
            } catch (Exception ex)
            {
                throw new Exception("Ocorreu um erro ao atualizar o locador no banco de dados.", ex);
            }

        }

        public async Task<Locador> DeleteLocador(string CPF)
        {
            try
            {
                var locador = await _dbcontext.Locadores.FirstOrDefaultAsync(x => x.CPF == CPF);

                if (locador == null)
                {
                    throw new Exception("Locador não encontrado.");
                }

                _dbcontext.Locadores.Remove(locador);
                await _dbcontext.SaveChangesAsync();

                return locador;
            } catch (Exception ex)
            {
                throw new Exception("Ocorreu um erro ao deletar o locador no banco de dados.", ex);
            }
        }

    }
}
