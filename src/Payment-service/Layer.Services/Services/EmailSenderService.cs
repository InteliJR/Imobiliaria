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
    public async Task<string> SendEmailAsync(string emailRecipient, string subject, string body)
    {
        try
            {
            var sender = "testeimob178@gmail.com";
            var senderPassword = "ocnf lrwc xmit pags"; // Usado apenas para essa aplicação

            using (SmtpClient client = new SmtpClient("smtp.gmail.com", 587))
                {
                    client.EnableSsl = true;
                    client.UseDefaultCredentials = false;
                    client.Credentials = new NetworkCredential(sender, senderPassword);

                    MailMessage mailMessage = new MailMessage
                {
                    From = new MailAddress(sender),
                    Subject = subject,
                    Body = body,
                    IsBodyHtml = true
                };
                    mailMessage.To.Add(emailRecipient);

                    await client.SendMailAsync(mailMessage);
                }

            return "E-mail enviado com sucesso!";
            }
            catch (Exception ex)
            {
            throw new Exception("Erro ao enviar o e-mail: " + ex.Message);
            }
        }
    }

}