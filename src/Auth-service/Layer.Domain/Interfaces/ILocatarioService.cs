using Layer.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Layer.Domain.Interfaces
{
    public interface ILocatarioService
    {
        Task<List<Locatario>> GetAllLocatariosAsync();

        Task<Locatario> InsertNewLocatario(Locatario locatario);

        Task<bool> LocatarioExist(string locatarioCPF);

        Task<Locatario> GetLocatarioByEmail(string email);

        Task<Locatario> GetLocatarioByUserId(int userId);

        Task<bool> UserAlreadyLinkedLocatario(int userId);

        Task<Locatario> GetLocatarioByLocatarioID(int locatarioID);

        Task<Locatario> UpdateLocatario(Locatario locatarioToUpdate);

        Task<Locatario> DeleteLocatario(string CPF);
    }
}
