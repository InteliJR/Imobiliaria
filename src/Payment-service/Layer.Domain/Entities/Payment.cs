using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;

namespace Layer.Domain.Entities
{
    [Table("pagamentos")]
    public class Payment
    {
        [Key]
        [Column("pagamentoid")]
        public int PaymentId { get; set; }

        [Column("contratoid")]
        public int ContratoId { get; set; } // Chave estrangeira para a tabela de contratos

        [Column("valor")]
        [DataType(DataType.Currency)]
        public decimal Valor { get; set; }

        [Column("data")]
        public DateTime Data { get; set; }

        // [Column("locatarioid")]
        // public int LocatarioId { get; set; } // Chave estrangeira para a tabela de locatarios

        [Column("pagante")]
        public string Pagante { get; set; } 

        [Column("metodo_pagamento")]
        [MaxLength(50)]
        public string MetodoPagamento { get; set; }

        [Column("descricao")]
        [MaxLength(255)]
        public string Descricao { get; set; }

        [Column("tipo_pagamento")]
        [MaxLength(50)]
        public string? TipoPagamento { get; set; }

        [Column("multa")]
        public bool Multa { get; set; }

        [Column("valor_multa")]
        [DataType(DataType.Currency)]
        public decimal? ValorMulta { get; set; }

        // Relacionamento com a entidade Contrato
        [ForeignKey("ContratoId")]
        public Contratos Contrato { get; set; }
    }
}
