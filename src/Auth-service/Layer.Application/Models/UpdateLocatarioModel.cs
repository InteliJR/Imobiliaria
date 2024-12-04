using System.ComponentModel.DataAnnotations;

namespace Layer.Application.Models
{
    public class UpdateLocatarioModel
    {
        [MaxLength(30)]
        public string? Email { get; set; }

        [MaxLength(255)]
        public string? CPF { get; set; }

        [MaxLength(100)]
        public string? Nacionalidade { get; set; }

        public string? NumeroTelefone { get; set; }

        [MaxLength(255)]
        public string? NomeCompletoLocatario { get; set; }

        [MaxLength(18)]
        public string? CNPJ { get; set; }

        [MaxLength(255)]
        public string? Endereco { get; set; }

        [MaxLength(25)]
        public string? Passaporte { get; set; }

        [MaxLength(25)]
        public string? RG { get; set; }
    }

}
