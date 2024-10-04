using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Layer.Domain.Entities
{
    [Table("locadores")]
    public class Locador
    {
        [Key]
        [Column("locadorid")]
        public int LocadorId { get; set; }

        [Column("usuarioid")]
        public int? UsuarioId { get; set; }

        [Column("imovelid")]
        public int? ImovelId { get; set; }

        [Column("pessoa_juridica")]
        public bool? PessoaJuridica { get; set; }

        [Column("cpf")]
        [MaxLength(14)]
        public string? CPF { get; set; }

        [Column("nacionalidade")]
        [MaxLength(100)]
        public string? Nacionalidade { get; set; }

        [Column("numero_telefone")]
        [MaxLength(20)]
        public string? NumeroTelefone { get; set; }

        [Column("nome_completo_locador")]
        [MaxLength(255)]
        public string? NomeCompletoLocador { get; set; }

        [Column("cnpj")]
        [MaxLength(18)]
        public string? CNPJ { get; set; }

        [Column("endereco")]
        [MaxLength(255)]
        public string? Endereco { get; set; }

        [Column("passaporte")]
        [MaxLength(20)]
        public string? Passaporte { get; set; }

        [Column("rg")]
        [MaxLength(20)]
        public string? RG { get; set; }
    }
}
