namespace property_management.Models
{
    public class NewChamado
    {
        public int IdChamado { get; set; }  // Identificador único do chamado
        public int IdImovel { get; set; }  // Chave estrangeira para a tabela de imóveis
        public string NomeSolicitante { get; set; }  // Nome do locatário que abriu o chamado
        public string ContatoSolicitante { get; set; }  // Contato do locatário
        public string NomeLocador { get; set; }  // Nome do locador (proprietário)
        public string ContatoLocador { get; set; }  // Contato do locador
        public string EnderecoImovel { get; set; }  // Endereço do imóvel
        public DateTime DataSolicitacao { get; set; }  // Data da abertura do chamado
        public DateTime? DataInicio { get; set; }  // Data de início da solicitação (opcional)
        public DateTime? DataFim { get; set; }  // Data de término da solicitação (opcional)
        public string Descricao { get; set; }  // Descrição do chamado
        public string TipoChamado { get; set; }  // Tipo do chamado (ex: reparo, manutenção)
        public string Status { get; set; } = "aberto";
    }
}
