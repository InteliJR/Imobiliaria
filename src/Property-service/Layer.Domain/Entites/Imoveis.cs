using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Layer.Domain.Entities
{
    // Mapear tabela de usuarios
    [Table("imoveis")]
    public class Imoveis
    {
        // É bom colocar o nome da coluna real para ajudar no mapeamento e manter padrões do Db e do .NET
        // No .NET geralmente usamos PascalCase e no Db geralmente usamos snake_case
        [Key]
        [Column("imovelid")] // Nome da coluna no banco de dados
        public int ImovelId { get; set; }

        [Column("tipo_imovel")]
        [MaxLength(255)] // Mesmo limite de 'varchar' no banco de dados, pode ajustar
        public string TipoImovel { get; set; }

        [Column("cep")]
        [MaxLength(255)]
        public string Cep { get; set; }

        [Column("condominio")]
        public decimal Condominio { get; set; }

        [Column("valor_imovel")]
        public decimal ValorImovel { get; set; }

        [Column("bairro")]
        [MaxLength(255)]
        public string Bairro { get; set; }

        [Column("descricao")]
        public string Descricao { get; set; }

        [Column("endereco")]
        [MaxLength(255)]
        public string Endereco { get; set; }

        [Column("complemento")]
        [MaxLength(255)]
        public string Complemento { get; set; }

        [Column("locatarioid")]
        public int? LocatarioId { get; set; }

        [Column("locadorid")]
        public int? LocadorId { get; set; }
    }
}