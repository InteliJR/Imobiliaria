using System.ComponentModel.DataAnnotations;

namespace Layer.Application.Models
{
    public class NewColaboradorModel
    {
        [Required]
        public int? UsuarioId { get; set; }

        [Required]
        [MaxLength(100)]
        public string NomeCompleto { get; set; }

        [Required]
        [MaxLength(15)]
        public string TipoColaborador { get; set; }
    }
}
