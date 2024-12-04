

namespace Layer.Application.Models
{
    public class NoColaboradorUserModel
    {
        public int UsuarioId { get; set; }
        public int RoleId { get; set; }
        public string Role { get; set; }
        public string Nome { get; set; }
        public string CPF { get; set; }
        public string Telefone { get; set; }
        public string Nacionalidade { get; set; }
        public string Endereco { get; set; }
        public string CNPJ { get; set; }
        public string Passaporte { get; set; }
        public string RG { get; set; }
        public string Email { get; set; }
        public bool Ativo { get; set; }
        public DateTime DataCriacao { get; set; }
    }
}