using Layer.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net.Mail;
using System.Net;
using System.Text;

namespace Layer.Services.Services
{
    public class EmailSenderService : IEmailSender
    {
        public async Task<string> SendEmailAsync(string emailRecipient, string mensage)
        {
            try
            {
                // Configurações do e-mail
                var sender = "testeimob178@gmail.com";
                var senderPassword = "ocnf lrwc xmit pags"; // Senha gerada só para essa aplicação, não é a senha do e-mail em si

                // Configuração do cliente SMTP
                SmtpClient client = new SmtpClient("smtp.gmail.com", 587);
                client.EnableSsl = true;
                client.UseDefaultCredentials = false;
                client.Credentials = new NetworkCredential(sender, senderPassword);

                // Create email message
                MailMessage mailMessage = new MailMessage();
                mailMessage.From = new MailAddress(sender);
                mailMessage.To.Add(emailRecipient);
                mailMessage.Subject = "Novo usuário plataforma KK";
                mailMessage.IsBodyHtml = true;
                StringBuilder mailBody = new StringBuilder();
                mailBody.AppendFormat("<h1>Você foi registrado na plataforma que mais paga atualmente</h1>");
                mailBody.AppendFormat("<p>Sua senha temporária é: {0}</p>", mensage);
                mailBody.AppendFormat("<br />");
                mailBody.AppendFormat("<p>Vá na plataforma www.kk.com.br</p>");
                mailMessage.Body = mailBody.ToString();

                // Send email
                client.Send(mailMessage);

                return "E-mail enviado com sucesso!";
            }
            catch (Exception ex)
            {
                throw new Exception("Erro ao enviar o e-mail: " + ex.Message);
            }
        }
    }
}
