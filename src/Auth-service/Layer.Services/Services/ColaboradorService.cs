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
    public class ColaboradorService : IColaboradorService
    {

        private readonly AppDbContext _dbcontext;

        public ColaboradorService(AppDbContext dbcontext)
        {
            _dbcontext = dbcontext;
        }

        public async Task<bool> ColaboradorExist(string colaboradorEmail)
        {
            try
            {
                var colaborador = await GetColaboradorByEmail(colaboradorEmail);

                if (colaborador != null)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            } catch (Exception ex) {
                throw new Exception(ex.Message);
            }

        }

        public async Task<Colaborador> DeleteColaborador(string email)
        {

            try
            {
                var colaborador = await GetColaboradorByEmail(email);

                if (colaborador != null)
                {
                    _dbcontext.Colaboradores.Remove(colaborador);
                    await _dbcontext.SaveChangesAsync();
                    return colaborador;
                }
                else
                {
                    throw new Exception("Colaborador não encontrado");
                }
            } catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public Task<List<Colaborador>> GetAllColabadores()
        {
            return _dbcontext.Colaboradores.ToListAsync();
        }

        public Task<Colaborador> GetColaboradorByColaboradorID(int colaboradorID)
        {
            return _dbcontext.Colaboradores.FirstOrDefaultAsync(x => x.ColaboradorId == colaboradorID);
        }

        public async Task<Colaborador> GetColaboradorByEmail(string email)
        {
            try
            {
                var user = await _dbcontext.Usuarios.FirstOrDefaultAsync(x => x.Email == email);

                var colaborador = await _dbcontext.Colaboradores.FirstOrDefaultAsync(x => x.UsuarioId == user.UsuarioId);

                if (colaborador != null)
                {
                    return colaborador;
                }
                else
                {
                    throw new Exception("Colaborador não encontrado");
                }

            } catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Colaborador> GetColaboradorByUserId(int userId)
        {
            try
            {
                var colaborador = await _dbcontext.Colaboradores.FirstOrDefaultAsync(x => x.UsuarioId == userId);

                if (colaborador != null)
                {
                    return colaborador;
                }
                else
                {
                    throw new Exception("Colaborador não encontrado");
                }

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Colaborador> InsertNewColaborador(Colaborador colaborador)
        {
            try
            {
                await _dbcontext.Colaboradores.AddAsync(colaborador);

                await _dbcontext.SaveChangesAsync();

                return colaborador;
            } catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Colaborador> UpdateColaborador(Colaborador colaboradorToUpdate)
        {
            try
            {
                _dbcontext.Colaboradores.Update(colaboradorToUpdate);

                await _dbcontext.SaveChangesAsync();

                return colaboradorToUpdate;
            } catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> UserAlreadyLinkedColaborador(int userId)
        {
            try
            {
                var user = await _dbcontext.Usuarios.FirstOrDefaultAsync(x => x.UsuarioId == userId);

                var colaborador = await _dbcontext.Colaboradores.FirstOrDefaultAsync(x => x.UsuarioId == user.UsuarioId);

                if (colaborador != null)
                {
                    return true;
                }
                else
                {
                    return false;
                }

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
