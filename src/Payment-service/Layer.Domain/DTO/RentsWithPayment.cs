using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Layer.Domain.Entities;

namespace Layer.Domain.DTO
{
    public class RentsWithPayment
    {
        public Rent Rent { get; set; }
        public Payment Payment { get; set; }
    }

}
