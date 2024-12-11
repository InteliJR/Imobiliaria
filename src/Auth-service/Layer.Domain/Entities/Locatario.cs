using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Layer.Domain.Entities
{
[Table("locatarios")]
    public class Locatario
    {
        [Key]
        [Column("locatarioid")]
        public int LocatarioId { get; set; }

        [Column("usuarioid")]
        public int? UsuarioId { get; set; }

        [Column("nome_completo_locatario")]
        [MaxLength(255)]
        public string? NomeCompletoLocatario { get; set; }

        [Column("numero_telefone")]
        [MaxLength(20)]
        public string? NumeroTelefone { get; set; }

        [Column("nacionalidade")]
        [MaxLength(100)]
        public string? Nacionalidade { get; set; }

        [Column("cpf")]
        [MaxLength(14)]
        public string? CPF { get; set; }

        [Column("rg")]
        [MaxLength(20)]
        public string? RG { get; set; }

        [Column("passaporte")]
        [MaxLength(20)]
        public string? Passaporte { get; set; }

        [Column("endereco")]
        [MaxLength(255)]
        public string? Endereco { get; set; }

        [Column("cnpj")]
        [MaxLength(18)]
        public string? CNPJ { get; set; }

        // Propriedade de navegação para User
        [ForeignKey("UsuarioId")]
        public User User { get; set; }
    }

}
