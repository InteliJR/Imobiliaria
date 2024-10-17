using Layer.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Layer.Domain.Interfaces
{
    public interface IMessageService
    {
        Task<IEnumerable<Message>> GetAll(); // Criando task para fazer a função de assincrona
        Task Add(Message message);

    }
}
