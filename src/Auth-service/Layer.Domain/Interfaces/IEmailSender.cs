using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Layer.Domain.Interfaces
{
    public interface IEmailSender
    {
        Task <string> SendEmailAsync (string emailRecipient, string mensage);
    }
}
