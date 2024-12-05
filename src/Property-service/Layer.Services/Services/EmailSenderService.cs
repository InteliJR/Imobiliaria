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
        public async Task<string> SendEmailAsync(string emailRecipient, string userType, string contractDetails)
        {
            try
            {
                // Configurações do e-mail
                var sender = "testeimob178@gmail.com";
                var senderPassword = "ocnf lrwc xmit pags"; // Senha gerada só para essa aplicação, não é a senha do e-mail em si

                // Configuração do cliente SMTP
                using (SmtpClient client = new SmtpClient("smtp.gmail.com", 587))
                {
                    client.EnableSsl = true;
                    client.UseDefaultCredentials = false;
                    client.Credentials = new NetworkCredential(sender, senderPassword);

                    // Criação da mensagem de e-mail
                    MailMessage mailMessage = new MailMessage();
                    mailMessage.From = new MailAddress(sender);
                    mailMessage.To.Add(emailRecipient);
                    mailMessage.Subject = "Notificação de Cadastro de Contrato";
                    mailMessage.IsBodyHtml = true;

                    // Corpo do e-mail de acordo com o tipo de usuário
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

                    mailMessage.Body = mailBody.ToString();

                    // Envio do e-mail
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
