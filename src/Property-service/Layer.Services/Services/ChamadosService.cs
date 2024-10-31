using Layer.Domain.Entites;
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
    public class ChamadosService:IChamadosRepository
    {
        private readonly ApplicationDbContext _dbContext;

        public ChamadosService(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Chamados> AddAsync(Chamados chamado)
        {
            _dbContext.Chamados.Add(chamado);
            await _dbContext.SaveChangesAsync();
            return chamado;
        }

        public async Task<int> DeleteAsync(int id)
        {
            var chamado = await _dbContext.Chamados.FindAsync(id);
            if (chamado == null)
            {
                return 0;
            }

            _dbContext.Chamados.Remove(chamado);
            return await _dbContext.SaveChangesAsync();
        }

        public async Task<List<Chamados>> GetAllAsync()
        {
            return await _dbContext.Chamados.ToListAsync();
        }

        public async Task<Chamados> GetByIdAsync(int id)
        {
            return await _dbContext.Chamados.FindAsync(id);
        }

        public async Task<int> UpdateAsync(Chamados chamado)
        {
            var existingChamado = await _dbContext.Chamados.FindAsync(chamado.IdChamado);
            if (existingChamado == null)
            {
                return 0; // Retorna 0 se o chamado não for encontrado
            }

            // Atualizando os campos
            existingChamado.NomeSolicitante = chamado.NomeSolicitante;
            existingChamado.ContatoSolicitante = chamado.ContatoSolicitante;
            existingChamado.NomeLocador = chamado.NomeLocador;
            existingChamado.ContatoLocador = chamado.ContatoLocador;
            existingChamado.IdImovel = chamado.IdImovel;
            existingChamado.DataSolicitacao = chamado.DataSolicitacao;
            existingChamado.DataInicio = chamado.DataInicio;
            existingChamado.DataFim = chamado.DataFim;
            existingChamado.Descricao = chamado.Descricao;
            existingChamado.TipoChamado = chamado.TipoChamado;
            existingChamado.Status = chamado.Status;

            _dbContext.Chamados.Update(existingChamado);
            return await _dbContext.SaveChangesAsync();
        }
    }
}
