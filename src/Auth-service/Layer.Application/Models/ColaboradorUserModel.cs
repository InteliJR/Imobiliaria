

namespace Layer.Application.Models
{
    public class ColaboradorUserModel
    {
        public int UsuarioId { get; set; }
        public int ColaboradorIdId { get; set; }
        public string Role { get; set; }
        public string Nome { get; set; }
        public string TipoColaborador { get; set; }
        public string Email { get; set; }
        public bool Ativo { get; set; }
        public DateTime DataCriacao { get; set; }

    }
}