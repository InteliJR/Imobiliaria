namespace Layer.Domain.Entities
{
    public class UserDetailsModel
    {
        public int UsuarioId { get; set; }
        public string Email { get; set; }
        public string TipoUsuario { get; set; }
        public bool Ativo { get; set; }
        public DateTime DataRegistro { get; set; }
        public LocadorDetails Locador { get; set; }
        public LocatarioDetails Locatario { get; set; }
        public ColaboradorDetails Colaborador { get; set; }
    }

    public class LocadorDetails
    {
        public int LocadorId { get; set; }
        public string NomeCompletoLocador { get; set; }
        public string CPF { get; set; }
        public string CNPJ { get; set; }
        public string Telefone { get; set; }
        public string Nacionalidade { get; set; }
        public string Endereco { get; set; }
        public string RG { get; set; }
    }

    public class LocatarioDetails
    {
        public int LocatarioId { get; set; }
        public string NomeCompletoLocatario { get; set; }
        public string CPF { get; set; }
        public string Passaporte { get; set; }
        public string CNPJ { get; set; }
        public string Telefone { get; set; }
        public string Nacionalidade { get; set; }
        public string Endereco { get; set; }
        public string RG { get; set; }
    }

    public class ColaboradorDetails
    {
        public int ColaboradorId { get; set; }
        public string NomeCompleto { get; set; }
    }
}
