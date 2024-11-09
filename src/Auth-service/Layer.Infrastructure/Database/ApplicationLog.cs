using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Driver;
using Layer.Domain.Entities;

namespace Layer.Infrastructure.Database
{
    public class ApplicationLog
    {
        private readonly IMongoCollection<Log> _logCollection; // Aqui a gnt ta criando uma coleção com o formato da classe Log

        public ApplicationLog(IMongoClient mongoClient, MongoDbSettings mongoDbSettings)
        {
            var database = mongoClient.GetDatabase(mongoDbSettings.DatabaseName); // Criando um banco de dados
            _logCollection = database.GetCollection<Log>(mongoDbSettings.LogsCollectionName); // Criando uma coleção (se existir ele pega, se não ele cria)
        }

        public async Task LogAsync(string message, string email, string role)
        {
            var logEntry = new Log
            {
                Message = message,
                Email = email,
                Role = role,
                Timestamp = DateTime.UtcNow
            };

            await _logCollection.InsertOneAsync(logEntry);
        }

        public async Task<List<Log>> GetAllLogs()
        {
            return await _logCollection.Find(_ => true).ToListAsync();
        }
    }
}