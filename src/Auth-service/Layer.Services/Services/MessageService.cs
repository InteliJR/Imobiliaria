using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Layer.Domain.Entities;
using Layer.Domain.Interfaces;

namespace Layer.Services.Services
{
    public class MessageService : IMessageService // Implementando a interface IMessageService
    {

        // !!! Simulando um banco de dados
        private readonly List<Message> _messages = new(); // Criando uma lista de mensagens
        private int _id = 1; // Criando um id para a mensagem

        public async Task Add(Message message)
        {
            // Criar um novo objeto do tipo mensagem que criei a entendiade lá no domínio
            var newMessage = new Message
            {
                Id = _id++,
                MenssageContent = message.MenssageContent
            };

            _messages.Add(newMessage); // Adicionando a mensagem na lista de mensagens

            await Task.CompletedTask; // Simular o aguardar de uma tarefa assincrona
        }

        public Task<IEnumerable<Message>> GetAll()
        {   
            return Task.FromResult(_messages.AsEnumerable()); // Retornando a lista de mensagens de maneira assincrona
        }
    }
}
