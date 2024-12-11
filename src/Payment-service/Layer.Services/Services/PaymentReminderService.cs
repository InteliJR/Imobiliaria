using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Layer.Domain.Interfaces;
using Layer.Domain.Entities;

namespace Layer.Services.Services
{
    public class PaymentReminderService : BackgroundService
    {
        private readonly IServiceProvider _serviceProvider;
        private readonly ILogger<PaymentReminderService> _logger;

        public PaymentReminderService(IServiceProvider serviceProvider, ILogger<PaymentReminderService> logger)
        {
            _serviceProvider = serviceProvider;
            _logger = logger;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                await SendPaymentReminders(stoppingToken);
                await Task.Delay(TimeSpan.FromDays(1), stoppingToken); // Executa a cada 24 horas
            }
        }

        private async Task SendPaymentReminders(CancellationToken stoppingToken)
        {
            using (var scope = _serviceProvider.CreateScope())
            {
                var paymentService = scope.ServiceProvider.GetRequiredService<IPaymentService>();
                var emailSender = scope.ServiceProvider.GetRequiredService<IEmailSender>();

                // Obter a data de vencimento para daqui a 5 dias
                var reminderDate = DateTime.Now.Date.AddDays(5);

                // Buscar os pagamentos que vencem em 5 dias
                var paymentsDueSoon = await paymentService.GetPaymentsDueByDateAsync(reminderDate);

                foreach (var payment in paymentsDueSoon)
                {
                    if (stoppingToken.IsCancellationRequested) break;

                    var subject = "Lembrete: Pagamento do Boleto Prestes a Vencer";
                    var body = $@"
                        <h1>Lembrete de Pagamento</h1>
                        <p>Prezado(a) {payment.Pagante},</p>
                        <p>Este é um lembrete de que o seu boleto com o valor de <strong>{payment.Valor:C}</strong> está prestes a vencer.</p>
                        <p>Data de Vencimento: {payment.Data:dd/MM/yyyy}</p>
                        <p>Favor realizar o pagamento o mais breve possível para evitar quaisquer penalidades.</p>
                        <p>Atenciosamente,<br/>Equipe KK Imobiliária</p>";

                    await emailSender.SendEmailAsync(payment.Pagante, subject, body);
                    _logger.LogInformation($"Lembrete de pagamento enviado para {payment.Pagante} para o pagamento ID {payment.PaymentId}");
                }
            }
        }
    }
}
