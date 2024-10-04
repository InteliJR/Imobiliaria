using System.ComponentModel.DataAnnotations;

namespace Layer.Application.Models
{
    public class NewLocadorModel
    {
        [Required]
        [MaxLength(30)]
        public string Email { get; set; }

        [Required]
        [MaxLength(255)]
        public string CPF { get; set; }

        [Required]
        public int ImovelId { get; set; }

        [Required]
        [MaxLength(100)]
        public string Nacionalidade { get; set; }

        [Required]
        public string NumeroTelefone { get; set; }

        [Required]
        [MaxLength(255)]
        public string NomeCompletoLocador { get; set; }

        [Required]
        [MaxLength(18)]
        public string CNPJ { get; set; }

        [Required]
        [MaxLength(255)]
        public string Endereco { get; set; }

        [Required]
        [MaxLength(25)]
        public string Passaporte { get; set; }

        [Required]
        [MaxLength(25)]
        public string RG { get; set; }
    
    }
}
