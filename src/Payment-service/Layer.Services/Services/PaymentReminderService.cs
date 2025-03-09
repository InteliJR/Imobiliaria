using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Layer.Domain.Interfaces;
using Layer.Domain.DTO;
using Layer.Infrastructure.ServicesInternal;
using Layer.Domain.Entities;
using Newtonsoft.Json;

namespace Layer.Services.Services
{
    public class PaymentReminderService : BackgroundService
    {
        private readonly IServiceProvider _serviceProvider;
        private readonly ILogger<PaymentReminderService> _logger;
        private readonly IUsersAPI _usersAPI;

        public PaymentReminderService(IServiceProvider serviceProvider, ILogger<PaymentReminderService> logger, IUsersAPI usersAPI)
        {
            _serviceProvider = serviceProvider;
            _logger = logger;
            _usersAPI = usersAPI;
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
                var emailSender = scope.ServiceProvider.GetRequiredService<IEmailSender>();
                var rentService = scope.ServiceProvider.GetRequiredService<IRentService>();

                // Buscar os pagamentos com vencimento em até 5 dias
                var payments = await rentService.GetAlugueisQueVencemEmXdias(5);

                foreach (var payment in payments)
                {
                    var locatarioInfos = await GetUserInfo(payment.LocatarioId.ToString(), "Locatario");

                    if(locatarioInfos == null){
                        _logger.LogError($"Erro ao buscar informações do locatário com ID {payment.LocatarioId}");
                        continue;
                    }

                    if (stoppingToken.IsCancellationRequested) break;

                    string subject;
                    string body;

                    subject = "Lembrete: Pagamento do Boleto Prestes a Vencer";
                    body = $@"
                        <h1>Lembrete de Pagamento</h1>
                        <p>Prezado(a) {locatarioInfos.Nome},</p>
                        <p>Este é um lembrete de que o seu boleto com o valor de <strong>R${payment.ValorAluguel:C}</strong> do mês {payment.Mes} está prestes a vencer.</p>
                        <p>Data de Vencimento: {payment.DataPagamento:dd/MM/yyyy}</p>
                        <p>Favor realizar o pagamento o mais breve possível para evitar quaisquer penalidades.</p>
                        <p>Atenciosamente,<br/>Equipe KK Imobiliária</p>";


                    // Enviar o email
                    await emailSender.SendEmailAsync(locatarioInfos.Email, subject, body);
                    _logger.LogInformation($"Email enviado para {locatarioInfos.Email} sobre o aluguel {payment.AluguelId} que está próximo do vencimento.");
                }
            }
        }

        private async Task<UserInfoDTO> GetUserInfo(string userId, string role)
        {
            var endpoint = "";

            if(role == "Locador")
            {
                endpoint = $"/User/infoLocador/{userId}";
            }
            else if(role == "Locatario")
            {
                endpoint = $"/User/infoLocatario/{userId}";
            }
            else{
                return null;
            }

            // Console.WriteLine($"Buscando informações do usuário com ID {userId}...");

            try
            {
                // Faz a requisição ao serviço de usuários
                var response = await _usersAPI.SendHMACRequestQueryAsync(endpoint, userId);

                // Console.WriteLine($"Resposta do servidor: {response}");

                // Desserializa o JSON na classe UserInfo
                var userInfo = JsonConvert.DeserializeObject<UserInfoDTO>(response);

                return userInfo;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao buscar informações do usuário: {ex.Message}");
                return null;
            }
        }
    }
}
