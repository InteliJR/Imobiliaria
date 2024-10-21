using Layer.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Layer.Domain.Interfaces
{
    public interface IColaboradorService
    {
        Task<List<Colaborador>> GetAllColabadores();

        Task<Colaborador> InsertNewColaborador(Colaborador colaborador);

        Task<bool> ColaboradorExist(string colaboradorEmail);

        Task<Colaborador> GetColaboradorByEmail(string email);

        Task<Colaborador> GetColaboradorByUserId(int userId);

        Task<bool> UserAlreadyLinkedColaborador(int userId);

        Task<Colaborador> GetColaboradorByColaboradorID(int colaboradorID);

        Task<Colaborador> UpdateColaborador(Colaborador colaboradorToUpdate);

        Task<Colaborador> DeleteColaborador(string email);

    }
}
