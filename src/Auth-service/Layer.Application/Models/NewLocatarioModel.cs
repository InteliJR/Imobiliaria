using System.ComponentModel.DataAnnotations;

namespace Layer.Application.Models
{
    public class NewLocadorModel
    {
        [Required]
        [MaxLength(255)]
        public string CPF { get; set; }

        [Required]
        [MaxLength(100)]
        public string Nacionalidade { get; set; }

        [Required]
        public string NumeroTelefone { get; set; }

        [Required]
        [MaxLength(255)]
        public string NomeCompletoLocador { get; set; }

        [MaxLength(18)]
        public string? CNPJ { get; set; }

        [Required]
        [MaxLength(255)]
        public string Endereco { get; set; }

        [MaxLength(25)]
        public string? Passaporte { get; set; }

        [Required]
        [MaxLength(25)]
        public string RG { get; set; }
    
    }
}
