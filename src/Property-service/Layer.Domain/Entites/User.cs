using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Layer.Domain.Entities
{
    // Mapear tabela de usuarios
    [Table("usuarios")]
    public class User
    {
        // É bom colocar o nome da coluna real para ajudar no mapeamento e manter padrões do Db e do .NET
        // No .NET geralmente usamos PascalCase e no Db geralmente usamos snake_case
        [Key]
        [Column("usuarioid")]
        public int UsuarioId { get; set; }

        [Column("email")]
        [MaxLength(255)]
        public string Email { get; set; }

        [Column("senha_hash")]
        [MaxLength(255)]
        public string Senha { get; set; }

        [Column("tipo_usuario")]
        [MaxLength(50)]
        public string TipoUsuario { get; set; }

        [Column("ativo")]
        public bool Ativo { get; set; }

        [Column("data_registro")]
        public DateTime DataRegistro { get; set; }

        [Column("data_atualizacao")]
        public DateTime DataAtualizacao { get; set; }
        public Locatario Locatario { get; set; }

    }
}
