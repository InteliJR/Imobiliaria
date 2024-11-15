﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Layer.Domain.Entites
{
    [Table("chamados")]
    public class Chamados
    {
        [Key]
        [Column("id_chamado")]
        public int IdChamado { get; set; }  // Identificador único do chamado

        [Column("imovelid")]
        public int IdImovel { get; set; }  // Chave estrangeira para a tabela de imóveis

        [Column("nome_solicitante")]
        [MaxLength(255)]
        public string NomeSolicitante { get; set; }  // Nome do locatário que abriu o chamado

        [Column("contato_solicitante")]
        [MaxLength(20)]
        public string ContatoSolicitante { get; set; }  // Contato do locatário

        [Column("nome_locador")]
        [MaxLength(255)]
        public string NomeLocador { get; set; }  // Nome do locador (proprietário)

        [Column("contato_locador")]
        [MaxLength(20)]
        public string ContatoLocador { get; set; }  // Contato do locador

        [Column("endereco_imovel")]
        [MaxLength(255)]
        public string EnderecoImovel { get; set; }  // Endereço do imóvel

        [Column("data_solicitacao")]
        public DateTime DataSolicitacao { get; set; }  // Data da abertura do chamado

        [Column("data_inicio")]
        public DateTime? DataInicio { get; set; }  // Data de início da solicitação (opcional)

        [Column("data_fim")]
        public DateTime? DataFim { get; set; }  // Data de término da solicitação (opcional)

        [Column("descricao")]
        public string Descricao { get; set; }  // Descrição do chamado

        [Column("tipo_chamado")]
        [MaxLength(50)]
        public string TipoChamado { get; set; }  // Tipo do chamado (ex: reparo, manutenção)

        [Column("status")]
        [MaxLength(10)]
        public string Status { get; set; } = "aberto";  // Status do chamado (padrão: "aberto")
    }
}