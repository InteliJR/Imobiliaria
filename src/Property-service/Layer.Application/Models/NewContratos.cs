namespace property_management.Models
{
    public class NewContratos
    {
        public required int LocadorId { get; set; }       // ID do locador
        public required int LocatarioId { get; set; }     // ID do locatário
        public required int ImovelId { get; set; }        // ID do imóvel
        public decimal ValorAluguel { get; set; }         // Valor do aluguel
        public decimal Iptu { get; set; }                 // Valor do IPTU
        public decimal TaxaAdm { get; set; }              // Taxa de administração
        public required DateTime DataInicio { get; set; } // Data de início do contrato
        public DateTime? DataEncerramento { get; set; }   // Data de encerramento do contrato
        public string? TipoGarantia { get; set; }         // Tipo de garantia (ex.: caução, seguro fiança)
        public string? CondicoesEspeciais { get; set; }   // Condições especiais no contrato
        public string? Status { get; set; }               // Status do contrato (ex.: ativo, encerrado)
        public DateTime? DataPagamento { get; set; }      // Data de pagamento do aluguel
        public DateTime? DataRescisao { get; set; }       // Data de rescisão, se aplicável
        public bool Renovado { get; set; }                // Indica se o contrato foi renovado
        public DateTime? DataEncerramentoRenovacao { get; set; } // Data de encerramento da renovação
        public decimal ValorReajuste { get; set; }
    }
}
