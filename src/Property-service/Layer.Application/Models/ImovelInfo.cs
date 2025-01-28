        
namespace property_management.Models
{
    public class ImovelInfo
    {
        public int ImovelId { get; set; }

        public string? Fotos { get; set; }

        public string TipoImovel { get; set; }

        public string Cep { get; set; }

        public double? Condominio { get; set; }

        public decimal ValorImovel { get; set; }

        public string Bairro { get; set; }

        public string? Descricao { get; set; }

        public string Endereco { get; set; }

        public string? Complemento { get; set; }

        public string? NomeLocatario { get; set; }

        public string? NomeLocador { get; set; }
    }
}