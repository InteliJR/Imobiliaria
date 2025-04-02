using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Layer.Domain.DTO
{
    public class GetPaymentDTO
    {
        public int PaymentId { get; set; }
        public int ContratoId { get; set; }
        public decimal Valor { get; set; }
        public DateTime Data { get; set; }
        public string Pagante { get; set; }
        public string MetodoPagamento { get; set; }
        public string? Descricao { get; set; }
        public string TipoPagamento { get; set; }
        public bool Multa { get; set; }
        public decimal? ValorMulta { get; set; }                              
        public decimal? Iptu { get; set; }
        public decimal? TaxaCondominio { get; set; }
        public decimal? ValorAluguel { get; set; }
        public decimal? TaxaAdministratia { get; set; }
    }

}

