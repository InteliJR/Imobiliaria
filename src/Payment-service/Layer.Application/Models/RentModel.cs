using System.ComponentModel.DataAnnotations;

namespace Layer.Application.Models
{
    public class RentModel
    {

        public int ContratoId { get; set; }

        public int? PagamentoId { get; set; } = null;

        public bool? Status { get; set; } = false;

        public string? Mes { get; set; }

        public string? BoletoDoc { get; set; } = null;

    }
}
