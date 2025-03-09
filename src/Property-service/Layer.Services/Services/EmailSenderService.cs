using Layer.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Net.Mail;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Layer.Services.Services
{
    public class EmailSenderService : IEmailSender
    {
        private readonly string _smtpServer;
        private readonly int _smtpPort;
        private readonly string _smtpUser;
        private readonly string _smtpPass;

        public EmailSenderService()
        {
            // Configurações do SMTP
            _smtpServer = "smtp.gmail.com";
            _smtpPort = 587;
            _smtpUser = "testeimob178@gmail.com";  // E-mail do remetente
            _smtpPass = "ocnf lrwc xmit pags"; // Senha gerada para a aplicação (App Password)
        }

        /// <summary>
        /// Método genérico para enviar e-mails.
        /// </summary>
        private async Task<bool> SendEmail(string recipientEmail, string subject, string body)
        {
            try
            {
                using (SmtpClient client = new SmtpClient(_smtpServer, _smtpPort))
                {
                    client.EnableSsl = true;
                    client.UseDefaultCredentials = false;
                    client.Credentials = new NetworkCredential(_smtpUser, _smtpPass);

                    var mailMessage = new MailMessage
                    {
                        From = new MailAddress(_smtpUser),
                        Subject = subject,
                        Body = body,
                        IsBodyHtml = true
                    };
                    mailMessage.To.Add(recipientEmail);

                    await client.SendMailAsync(mailMessage);
                }

                Console.WriteLine($"E-mail enviado com sucesso para {recipientEmail}");
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao enviar e-mail para {recipientEmail}: {ex.Message}");
                return false;
            }
        }

        /// <summary>
        /// Método para enviar e-mails genéricos.
        /// </summary>
        public async Task<bool> EnviarEmailAsync(string email, string assunto, string mensagem)
        {
            return await SendEmail(email, assunto, mensagem);
        }

        /// <summary>
        /// Método específico para enviar notificação de cadastro de contrato.
        /// </summary>
        public async Task<string> SendEmailAsync(string emailRecipient, string userType, string contractDetails)
        {
            string subject = "Notificação de Cadastro de Contrato";
            StringBuilder mailBody = new StringBuilder();

            if (userType.Equals("Locador", StringComparison.OrdinalIgnoreCase))
            {
                mailBody.AppendFormat("<h1>Prezado Locador,</h1>");
                mailBody.AppendFormat("<p>O contrato foi cadastrado com sucesso. Aqui estão os detalhes:</p>");
                mailBody.AppendFormat("<p>{0}</p>", contractDetails);
                mailBody.AppendFormat("<br /><p>Atenciosamente,<br />Equipe KK Imobiliária</p>");
            }
            else if (userType.Equals("Locatário", StringComparison.OrdinalIgnoreCase))
            {
                mailBody.AppendFormat("<h1>Prezado Locatário,</h1>");
                mailBody.AppendFormat("<p>O contrato foi cadastrado com sucesso e estamos prontos para continuar com o processo.</p>");
                mailBody.AppendFormat("<p>{0}</p>", contractDetails);
                mailBody.AppendFormat("<br /><p>Atenciosamente,<br />Equipe KK Imobiliária</p>");
            }
            else
            {
                throw new Exception("Tipo de usuário inválido. Informe 'Locador' ou 'Locatário'.");
            }

            bool enviado = await SendEmail(emailRecipient, subject, mailBody.ToString());
            return enviado ? "E-mail enviado com sucesso!" : "Erro ao enviar o e-mail.";
        }
    }
}
