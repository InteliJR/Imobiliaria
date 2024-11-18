using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Layer.Domain.Entities
{
    public class Log
    {
        public string Message { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        public DateTime Timestamp { get; set; }
    }
}
