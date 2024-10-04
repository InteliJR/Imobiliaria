using Layer.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Layer.Domain.Interfaces
{
    public interface ILocadorService
    {   
        Task<List<Locador>> GetAllLocadorsAsync();

        Task<Locador> InsertNewLocador(Locador locador);

        Task<bool> LocadorExist(string locadorCPF);

        Task<Locador> GetLocadorByEmail(string email);

        Task<Locador> GetLocadorByUserId(int userId);

        Task<bool> UserAlreadyLinkedLocador(int userId);
    }
}
