using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Layer.Application.Models
{
    public class NewUserModel
    {

        [Required]
        [EmailAddress]
        [MaxLength(255)]
        public string Email { get; set; }

    }
}
