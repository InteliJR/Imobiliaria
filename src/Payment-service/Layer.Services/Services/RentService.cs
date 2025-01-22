using Layer.Domain.Entities;
using Layer.Domain.Interfaces;
using Layer.Infrastructure;
using Layer.Infrastructure.Database;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Data;
using System;
using System.Linq;
using System.Text;


namespace Layer.Services.Services
{
    public class RentService : IRentService
    {
        private readonly AppDbContext _dbcontext;

        public RentService(AppDbContext context)
        {
            _dbcontext = context;
        }

        public async Task<IEnumerable<Rent>> GetAllRentsAsync()
        {
            return await _dbcontext.Alugueis.ToListAsync();
        }

        public async Task<IEnumerable<Rent>> GetAllRentsByIdImovel(int imovelid)
        {
            var rents = await _dbcontext.Alugueis
            .Join(_dbcontext.Contratos,
                rent => rent.ContratoId,
                contrato => contrato.ContratoId,
                (rent, contrato) => new { Rent = rent, Contrato = contrato })
            .Where(rc => rc.Contrato.ImovelId == imovelid)
            .Select(rc => rc.Rent)
            .ToListAsync();

            if (!rents.Any())
            {
                throw new KeyNotFoundException("Nenhum aluguel encontrado para este imovelId");
            }

            return rents;
        }

        public async Task<IEnumerable<Rent>> GetAllRentsByIdLocatario(int locatarioid)
        {
            var rents = await _dbcontext.Alugueis
            .Join(_dbcontext.Contratos,
                rent => rent.ContratoId,
                contrato => contrato.ContratoId,
                (rent, contrato) => new { Rent = rent, Contrato = contrato })
            .Where(rc => rc.Contrato.LocatarioId == locatarioid)
            .Select(rc => rc.Rent)
            .ToListAsync();

            if (!rents.Any())
            {
                throw new KeyNotFoundException("Nenhum aluguel encontrado para este locatarioId");
            }

            return rents;
        }

        public async Task<IEnumerable<Rent>> GetAllRentsByIdLocador(int locadorid)
        {
            var rents = await _dbcontext.Alugueis
            .Join(_dbcontext.Contratos,
                rent => rent.ContratoId,
                contrato => contrato.ContratoId,
                (rent, contrato) => new { Rent = rent, Contrato = contrato })
            .Where(rc => rc.Contrato.LocadorId == locadorid)
            .Select(rc => rc.Rent)
            .ToListAsync();

            if (!rents.Any())
            {
                throw new KeyNotFoundException("Nenhum aluguel encontrado para este locadorId");
            }

            return rents;
        }

        public async Task<IEnumerable<Rent>> GetAllRentsByContractId(int contractid)
        {
            var rents = await _dbcontext.Alugueis
            .Where(r => r.ContratoId == contractid)
            .ToListAsync();

            if (!rents.Any())
            {
                throw new KeyNotFoundException("Nenhum aluguel encontrado para este contractId");
            }

            return rents;
        }

        public async Task<Rent> GetAllRentByPaymentId(int paymentid)
        {
            var rent = await _dbcontext.Alugueis
            .Where(r => r.PagamentoId == paymentid)
            .FirstOrDefaultAsync();

            if (rent == null)
            {
                throw new KeyNotFoundException("Nenhum aluguel encontrado para este paymentId");
            }

            return rent;
        }

        public async Task<Rent> GetRentByIdAsync(int id)
        {
            var rent = await _dbcontext.Alugueis.FindAsync(id);
            if (rent == null)
            {
                throw new Exception("Aluguel não encontrado.");
            }
            return rent;
        }

        public async Task<IEnumerable<Rent>> GetRentsDueByDateAsync(DateTime dueDate)
        {
            var rents = await _dbcontext.Alugueis
            .Where(r => r.Mes == dueDate.ToString("MM/yyyy"))
            .ToListAsync();

            if (!rents.Any())
            {
                throw new KeyNotFoundException("Nenhum aluguel encontrado para esta data de vencimento");
            }

            return rents;
        }

        public async Task<Rent> AddRentAsync(Rent rent)
        {
            try
            {
                _dbcontext.Alugueis.Add(rent);
                await _dbcontext.SaveChangesAsync();
                return rent;
            }
            catch (Exception ex)
            {
                throw new Exception("Erro ao adicionar aluguel: " + ex.Message);
            }
        }

        public async Task<Rent> UpdateRentAsync(Rent rent)
        {
            _dbcontext.Alugueis.Update(rent);
            await _dbcontext.SaveChangesAsync();
            return rent;
        }

        public async Task DeleteRentAsync(int id)
        {
            var rent = await _dbcontext.Alugueis.FindAsync(id);
            if (rent != null)
            {
                _dbcontext.Alugueis.Remove(rent);
                await _dbcontext.SaveChangesAsync();
            }
            else
            {
                throw new Exception("Aluguel não encontrado.");
            }

        }

        public async Task<Rent> UpdateRentToPaidAsync(int Rentid, int Paymentid)
        {
            var rent = await _dbcontext.Alugueis.FindAsync(Rentid);
            var payment = await _dbcontext.Pagamentos.FindAsync(Paymentid);
            if (payment == null)
            {
                throw new Exception("Pagamento não encontrado.");
            }
            
            if (rent != null)
            {
                rent.PagamentoId = Paymentid;
                rent.Status = true;
                _dbcontext.Alugueis.Update(rent);
                await _dbcontext.SaveChangesAsync();
                return rent;
            }
            else
            {
                throw new Exception("Aluguel não encontrado.");
            }

        }


    public async Task<List<Rent>> CreateRentNextMonthAsync(int contratoId, int numberOfMonthsAhead)
    {
        var newRents = new List<Rent>();

        // Pegar todos os aluguéis de um certo contrato
        var lastRentMonth = await GetLastRentMonthAsync(contratoId);

        if(lastRentMonth == null)
        {
            var currentMonth = DateTime.Now.ToString("MM/yyyy");

            var firstRent = new Rent
            {
                ContratoId = contratoId,
                Mes = currentMonth,
                Status = false
            };
            await AddRentAsync(firstRent);
            newRents.Add(firstRent);

            lastRentMonth = currentMonth;
        }

        Console.WriteLine($"Último mês registrado: {lastRentMonth}");

        // Converter o ultimo mês para DateTime
        var lastRentDate = DateTime.ParseExact(lastRentMonth, "MM/yyyy", null);

        var nextMonths = new List<string>();

        // Criar uma list com os proximos mês para depois interar na criação dos aluguéis
        for (int month = 1; month <= numberOfMonthsAhead; month++){
            nextMonths.Add(lastRentDate.AddMonths(month).ToString("MM/yyyy"));
        }

        try
        {
            foreach (var month in nextMonths)
            {
                var rent = new Rent
                {
                    ContratoId = contratoId,
                    Mes = month,
                    Status = false
                };
                await AddRentAsync(rent);
                newRents.Add(rent);
            }

            return newRents;
        }
        catch (Exception ex)
        {
            throw new Exception("Erro ao adicionar aluguel: " + ex.Message);
        }

    }

    private async Task<string> GetLastRentMonthAsync(int contractId)
    {
        var rents = await _dbcontext.Alugueis
            .Where(r => r.ContratoId == contractId)
            .ToListAsync();

        if (!rents.Any())
        {
            return null;
        }

        // Ordenar e pegar o último mês
        var lastRent = rents.OrderByDescending(r => DateTime.ParseExact(r.Mes, "MM/yyyy", null)).FirstOrDefault();
        return lastRent.Mes;
    }



    }
}
