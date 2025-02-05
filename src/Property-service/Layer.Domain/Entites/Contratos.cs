using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Layer.Domain.Entities;

namespace Layer.Domain.Entites
{
    [Table("contratos")]
    public class Contratos
    {
        [Key]
        [Column("contratoid")] // Nome da coluna no banco de dados
        public int ContratoId { get; set; }

        [Column("documentos", TypeName = "varchar")] // Nome da coluna e tipo no banco de dados
        public string? Documentos { get; set; }

        [Column("valor_aluguel")] // Nome da coluna no banco de dados
        public decimal ValorAluguel { get; set; }

        [Column("data_inicio")] // Nome da coluna no banco de dados
        public DateTime DataInicio { get; set; }

        [Column("data_encerramento")] // Nome da coluna no banco de dados
        public DateTime? DataEncerramento { get; set; }

        [Column("data_reajuste")]
        public DateTime? DataReajuste { get; set; }

        [ForeignKey("Locador")]
        [Column("locadorid")] // Nome da coluna no banco de dados
        public int LocadorId { get; set; }

        [ForeignKey("Locatario")]
        [Column("locatarioid")] // Nome da coluna no banco de dados
        public int LocatarioId { get; set; }

        public virtual Locatario? Locatario { get; set; } 

        public virtual Locador? Locador { get; set; }

        public virtual Imoveis? Imovel { get;set; }
        
        [ForeignKey("Imovel")]
        [Column("imovelid")] // Nome da coluna no banco de dados
        public int ImovelId { get; set; }

        [Column("tipo_garantia", TypeName = "varchar")] // Nome da coluna e tipo no banco de dados
        public string? TipoGarantia { get; set; }

        [Column("condicoes_especiais", TypeName = "text")] // Nome da coluna no banco de dados
        public string? CondicoesEspeciais { get; set; }

        [Column("status", TypeName = "varchar")] // Nome da coluna e tipo no banco de dados
        public string Status { get; set; }

        [Column("iptu")] // Nome da coluna no banco de dados
        public decimal? Iptu { get; set; }

        [Column("data_pagamento")] // Nome da coluna no banco de dados
        public DateTime? DataPagamento { get; set; }

        [Column("taxa_adm")] // Nome da coluna no banco de dados
        public decimal? TaxaAdm { get; set; }

        [Column("data_rescisao")] // Nome da coluna no banco de dados
        public DateTime? DataRescisao { get; set; }

        [Column("renovado")] // Nome da coluna no banco de dados
        public bool Renovado { get; set; }

        [Column("data_encerramento_renovacao")] // Nome da coluna no banco de dados
        public DateTime? DataEncerramentoRenovacao { get; set; }

        [Column("valor_reajuste")] // Nome da coluna no banco de dados
        public decimal? ValorReajuste { get; set; }

    }
}
