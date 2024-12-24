using System.ComponentModel.DataAnnotations;

namespace Layer.Application.Models
{
    public class NewJuridicoAdmModel
    {

        [Required]
        [MaxLength(100)]
        public string NomeCompleto { get; set; }

    }
}
