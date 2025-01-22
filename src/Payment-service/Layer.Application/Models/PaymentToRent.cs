using System.ComponentModel.DataAnnotations;

namespace Layer.Application.Models
{
    public class PaymentToRent
    {

        public int RentId { get; set; }

        public decimal Valor { get; set; }

        public string Pagante { get; set; } 

        public string MetodoPagamento { get; set; }

        public string Descricao { get; set; }

        public string TipoPagamento { get; set; }

        public bool Multa { get; set; }

        public decimal? ValorMulta { get; set; }


    }
}
