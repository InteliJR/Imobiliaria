using Layer.Domain.Entities;
using Layer.Domain.Interfaces;
using Layer.Domain.DTO;
using Layer.Infrastructure;
using Layer.Infrastructure.Database;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Data;
using System;
using System.Linq;
using System.Text;
using Microsoft.AspNetCore.Http;


namespace Layer.Services.Services
{
    public class RentService : IRentService
    {
        private readonly AppDbContext _dbcontext;
        
        private readonly GoogleCloudStorageService _storageService;

        public RentService(AppDbContext context)
        {
            _dbcontext = context;

            string filePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "administradora-kk-firebase-adminsdk-1fa3k-7b4c700bd8.json");

            if (!File.Exists(filePath))
            {
                filePath = "/etc/secrets/administradora-kk-firebase-adminsdk-1fa3k-7b4c700bd8.json";
            }

            var bucketName = "administradora-kk.appspot.com"; // Substitua pelo nome correto do seu bucket
            _storageService = new GoogleCloudStorageService(filePath, bucketName);
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

        public async Task<IEnumerable<RentsWithPayment>> GetAllRentsWithPaymentsByIdImovel(int imovelid)
        {
            var rentsWithPayments = await _dbcontext.Alugueis
            .Join(_dbcontext.Contratos,
                rent => rent.ContratoId,
                contrato => contrato.ContratoId,
                (rent, contrato) => new { Rent = rent, Contrato = contrato })
            .Where(rc => rc.Contrato.ImovelId == imovelid)
            .GroupJoin(_dbcontext.Pagamentos,
                rc => rc.Rent.PagamentoId,
                pagamento => pagamento.PaymentId,
                (rc, pagamento) => new { Rent = rc.Rent, Pagamento = pagamento.FirstOrDefault() })
            .Select(rp => new RentsWithPayment
            {
                Rent = rp.Rent,
                Payment = rp.Pagamento
            })
            .ToListAsync();

            if (!rentsWithPayments.Any())
            {
            throw new KeyNotFoundException("Nenhum aluguel encontrado para este imovelId");
            }

            return rentsWithPayments;
        }
        public async Task<IEnumerable<RentsWithPayment>> GetAllRentsWithPaymentsByContractId(int contractId)
        {
            var rentsWithPayments = await _dbcontext.Alugueis
            .Where(r => r.ContratoId == contractId)
            .GroupJoin(_dbcontext.Pagamentos,
            rent => rent.PagamentoId,
            pagamento => pagamento.PaymentId,
            (rent, pagamento) => new { Rent = rent, Pagamento = pagamento.FirstOrDefault() })
            .Select(rp => new RentsWithPayment
            {
            Rent = rp.Rent,
            Payment = rp.Pagamento
            })
            .ToListAsync();

            if (!rentsWithPayments.Any())
            {
            throw new KeyNotFoundException("Nenhum aluguel encontrado para este contractId");
            }

            return rentsWithPayments;
        }

        public async Task<IEnumerable<RentsWithPayment>> GetAllRentsWithPaymentsByIdLocatario(int locatarioid)
        {
            var rentsWithPayments = await _dbcontext.Alugueis
            .Join(_dbcontext.Contratos,
            rent => rent.ContratoId,
            contrato => contrato.ContratoId,
            (rent, contrato) => new { Rent = rent, Contrato = contrato })
            .Where(rc => rc.Contrato.LocatarioId == locatarioid)
            .GroupJoin(_dbcontext.Pagamentos,
            rc => rc.Rent.PagamentoId,
            pagamento => pagamento.PaymentId,
            (rc, pagamento) => new { Rent = rc.Rent, Pagamento = pagamento.FirstOrDefault() })
            .Select(rp => new RentsWithPayment
            {
            Rent = rp.Rent,
            Payment = rp.Pagamento
            })
            .ToListAsync();

            if (!rentsWithPayments.Any())
            {
            throw new KeyNotFoundException("Nenhum aluguel encontrado para este locatarioId");
            }

            return rentsWithPayments;
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

        public async Task<Rent> UpdateRentToPaidAsync(int Rentid, int Paymentid, IFormFileCollection file)
        {
            var rent = await _dbcontext.Alugueis.FindAsync(Rentid);
            var payment = await _dbcontext.Pagamentos.FindAsync(Paymentid);

            if (payment == null)
            {
                throw new Exception("Pagamento não encontrado.");
            }

            string fileUrl= "";

            try
            {
                if (file != null)
                {
                    var tempFilePath = Path.GetTempFileName();
                    using (var stream = new FileStream(tempFilePath, FileMode.Create))
                    {
                        foreach (var formFile in file)
                        {
                            await formFile.CopyToAsync(stream);
                        }
                    }

                    var objectName = $"comprovantes/{file.First().FileName}";
                    var publicUrl = await _storageService.UploadFileAsync(tempFilePath, objectName);

                    fileUrl = publicUrl;
                }

            } catch (Exception ex){
                throw new Exception("Erro ao salvar arquivo: " + ex.Message);
            }


            if (rent != null)
            {
                rent.PagamentoId = Paymentid;
                rent.Status = true;
                rent.BoletoDoc = fileUrl;
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

        public async Task<Contratos> ContractById(int contractId)
        {
            var contract = await _dbcontext.Contratos.FindAsync(contractId);

            if (contract == null)
            {
                throw new Exception("Contrato não encontrado.");
            }

            return contract;
        }

        public async Task<string> GenerateSignedUrlOfContractsAsync(string objectName)
        {
            return await _storageService.GenerateSignedUrlAsync(objectName, 5);
        }

        public async Task<IEnumerable<RentAndContractInfoDTO>> GetAlugueisQueVencemEmXdias(int days)
        {
            // Calcular data alvo, hoje + X dias
            var saoPauloTimeZone = TimeZoneInfo.FindSystemTimeZoneById("E. South America Standard Time");
            // Configurar o TimeZoneInfo para São Paulo
            var nowInSaoPaulo = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, saoPauloTimeZone);

            var targetDate = nowInSaoPaulo.Date.AddDays(5);
            // Console.WriteLine($"Data alvo em São Paulo: {targetDate:dd/MM/yyyy}");
            // Console.WriteLine($"[DEBUG] Dias solicitados: {days}");
            // Console.WriteLine($"[DEBUG] Data alvo calculada: {targetDate:dd/MM/yyyy}");

            // Alugueis não pagos
            var rents = await _dbcontext.Alugueis
                .Where(r => r.Status == false)
                .ToListAsync();
            // Console.WriteLine($"[DEBUG] Quantidade de aluguéis não pagos encontrados: {rents.Count}");

            var result = new List<RentAndContractInfoDTO>();

            foreach (var rent in rents)
            {
                // Console.WriteLine($"[DEBUG] Iniciando processamento do Aluguel ID = {rent.AluguelId}, Mês = {rent.Mes}");

                // Pegar o contrato
                var contract = await _dbcontext.Contratos.FindAsync(rent.ContratoId);
                if (contract == null)
                {
                    // Console.WriteLine($"[DEBUG] Contrato não encontrado para Aluguel {rent.AluguelId} (ContratoId = {rent.ContratoId}). Ignorando.");
                    continue;
                }

                if (!contract.DataPagamento.HasValue)
                {
                    // Console.WriteLine($"[DEBUG] Contrato {rent.ContratoId} não possui DataPagamento. Ignorando.");
                    continue;
                }

                // Dia do pagamento do aluguel, isso que importa pra gnt
                var day = contract.DataPagamento.Value.Day;
                // Console.WriteLine($"[DEBUG] Dia fixo do contrato = {day}");

                // Extrair mês/ano do Aluguel, pq salvamos como ex: 01/25
                var splitted = rent.Mes.Split('/');
                if (splitted.Length < 2)
                {
                    // Console.WriteLine($"[DEBUG] Formato de 'Mes' inválido: {rent.Mes}");
                    continue;
                }

                if (!int.TryParse(splitted[0], out var month) ||
                    !int.TryParse(splitted[1], out var year))
                {
                    // Console.WriteLine($"[DEBUG] Erro ao fazer parse do mês ou ano em {rent.Mes}");
                    continue;
                }

                // Console.WriteLine($"[DEBUG] Mês extraído = {month}, Ano extraído = {year}");

                // Montar a data de vencimento
                DateTime dueDate;
                try
                {
                    dueDate = new DateTime(year, month, day);
                }
                catch
                {
                    // Console.WriteLine($"[DEBUG] Data inválida (Dia:{day}, Mês:{month}, Ano:{year}). Ignorando Aluguel {rent.AluguelId}.");
                    continue;
                }

                // Se a data de vencimento for IGUAL a 'targetDate', significa que vence daqui X dias
                if (dueDate.Date == targetDate.Date)
                {
                    Console.WriteLine($"[DEBUG] Aluguel {rent.AluguelId} vence em {days} dias. (Data de vencimento: {dueDate:dd/MM/yyyy})");

                    result.Add(new RentAndContractInfoDTO
                    {
                        AluguelId = rent.AluguelId,
                        Mes = rent.Mes,
                        ContratoId = rent.ContratoId,
                        ValorAluguel = contract.ValorAluguel,
                        LocadorId = contract.LocadorId,
                        LocatarioId = contract.LocatarioId,
                        DataPagamento = dueDate
                    });
                }
                else
                {
                    Console.WriteLine($"[DEBUG] Aluguel {rent.AluguelId} NÃO vence em {days} dias. (Data de vencimento: {dueDate:dd/MM/yyyy}, DataTarget: {targetDate:dd/MM/yyyy})");
                }
            }

            Console.WriteLine($"[DEBUG] Quantidade de aluguéis encontrados que vencem em {days} dias: {result.Count}");
            return result;
        }


    }

}
