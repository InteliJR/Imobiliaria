namespace property_management.Models
{
    public class NewChamado
    {
        public int IdImovel { get; set; }  // Chave estrangeira para a tabela de imóveis
        public string Titulo { get; set; }  // Título do chamado
        public int SolicitanteId { get; set; }  // Nome do locatário que abriu o chamado
        public DateTime DataSolicitacao { get; set; }  // Data da abertura do chamado
        // public DateTime? DataInicio { get; set; }  // Data de início da solicitação (opcional)
        // public DateTime? DataFim { get; set; }  // Data de término da solicitação (opcional)
        public string Descricao { get; set; }  // Descrição do chamado
        public string TipoChamado { get; set; }  // Tipo do chamado (ex: reparo, manutenção)
        public string Status { get; set; } = "aberto";
    }
}
