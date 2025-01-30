        
namespace Layer.Domain.DTO
{
    public class UserInfoDTO
    {
        public int UsuarioId { get; set; }
        public int RoleId { get; set; }
        public string Role { get; set; }
        public string Nome { get; set; }
        public string Cpf { get; set; }
        public string? Telefone { get; set; }
        public string Nacionalidade { get; set; }
        public string? Endereco { get; set; }
        public string? Cnpj { get; set; }
        public string? Passaporte { get; set; }
        public string? Rg { get; set; }
        public string? Email { get; set; }
        public bool Ativo { get; set; }
        public DateTime DataCriacao { get; set; }
    }
}