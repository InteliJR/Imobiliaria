using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Layer.Domain.Interfaces;
using Layer.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Layer.Services.Services
{
    public class ContractsReminder : BackgroundService
    {
        private readonly ILogger<ContractsReminder> _logger;
        private readonly IServiceProvider _serviceProvider;

        // Construtor para injeção de dependências
        public ContractsReminder(ILogger<ContractsReminder> logger, IServiceProvider serviceProvider)
        {
            _logger = logger;
            _serviceProvider = serviceProvider;
        }

        // Método que executa a atualização de contratos em segundo plano
        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("Serviço de Atualização de Valor de Aluguel iniciado.");

            while (!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    using (var scope = _serviceProvider.CreateScope())
                    {
                        var rentService = scope.ServiceProvider.GetRequiredService<IContratosRepository>();

                        // Obtém os contratos que precisam de reajuste
                        var contratos = await rentService.GetContratosParaReajusteAsync(stoppingToken);

                        foreach (var contrato in contratos)
                        {
                            // Aplica o reajuste no contrato
                            await rentService.AplicarReajusteAsync(contrato, stoppingToken);

                            _logger.LogInformation($"Contrato {contrato.ContratoId} atualizado. Novo valor: {contrato.ValorAluguel}");
                        }
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogError($"Erro ao processar reajuste de aluguel: {ex.Message}");
                }

                // Aguarda 24 horas para rodar novamente
                await Task.Delay(TimeSpan.FromHours(24), stoppingToken);
            }
        }
    }
}
