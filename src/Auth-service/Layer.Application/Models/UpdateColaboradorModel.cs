using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Layer.Application.Models
{
    public class UpdateColaboradorModel
    {
        public int? UsuarioId { get; set; }

        [MaxLength(100)]
        public string? NomeCompleto { get; set; }

        [MaxLength(15)]
        public string? TipoColaborador { get; set; }
    }
}
