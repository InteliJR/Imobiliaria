﻿namespace property_management.Models
{
    public class NewImoveis
    {
        public string TipoImovel { get; set; }
        public required string Cep { get; set; }
        public decimal Condominio { get; set; }
        public decimal ValorImovel { get; set; }
        public string Bairro { get; set; }
        public string Descricao { get; set; }
        public string Endereco { get; set; }
        public string Complemento { get; set; }
    }
}
