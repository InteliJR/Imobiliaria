namespace Layer.Domain.DTO
{
    public class RentAndContractInfoDTO
    {
        public int AluguelId { get; set; }
        public string? Mes { get; set; }
        public int ContratoId { get; set; }
        public decimal ValorAluguel { get; set; }
        public int LocadorId { get; set; }
        public int LocatarioId { get; set; }
        public DateTime? DataPagamento { get; set; }
        public string? AtrasadoOuProximo { get; set; }

    }

}
