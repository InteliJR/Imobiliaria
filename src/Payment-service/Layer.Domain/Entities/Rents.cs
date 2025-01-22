using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Layer.Domain.Entities;


namespace Layer.Domain.Entities
{
    [Table("alugueis")]
    public class Rent
    {
        [Key]
        [Column("aluguelid")]
        public int AluguelId { get; set; }

        [Column("contratoid")]
        public int ContratoId { get; set; }

        [Column("pagamentoid")]
        public int? PagamentoId { get; set; }

        [Column("status")]
        public bool? Status { get; set; }

        [Column("mes")]
        [MaxLength(50)]
        public string? Mes { get; set; }

        [Column("boleto_doc")]
        [MaxLength(255)]
        public string? BoletoDoc { get; set; }


        [ForeignKey("ContratoId")]
        [JsonIgnore]
        public virtual Contratos? Contrato { get; set; }

        [ForeignKey("PagamentoId")]
        [JsonIgnore]
        public virtual Payment? Pagamento { get; set; }
    }

}
