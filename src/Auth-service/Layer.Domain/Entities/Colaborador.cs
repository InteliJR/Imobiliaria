using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Layer.Domain.Entities
{
    [Table("colaboradores")]
    public class Colaborador
    {
        [Key]
        [Column("colaboradorid")]
        public int ColaboradorId { get; set; }

        [Column("usuarioid")]
        public int? UsuarioId { get; set; }  // Pode ser nullable, já que é permitido no banco

        [Column("nome_completo")]
        [MaxLength(255)]
        [Required]  // Nome completo é obrigatório
        public string NomeCompleto { get; set; }

        [Column("tipo_colaborador")]
        [MaxLength(50)]
        public string TipoColaborador { get; set; }  // Pode ser opcional
    }
}
