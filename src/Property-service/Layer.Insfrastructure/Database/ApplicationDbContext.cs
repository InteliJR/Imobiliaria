using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Layer.Domain.Entities;

namespace Layer.Infrastructure.Database
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        // Mapear a tabela de imoveis
        public DbSet<Imoveis> Imoveis { get; set; }

        // Configurações adicionais no método OnModelCreating, se necessário
        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    base.OnModelCreating(modelBuilder);

        //    // Adicionar configurações de mapeamento personalizadas se necessário
        //    // Exemplo: Configuração de chaves primárias compostas ou índices
        //    modelBuilder.Entity<Imoveis>(entity =>
        //    {
        //        entity.HasKey(e => e.ImovelId); // Define a chave primária

        //        entity.Property(e => e.TipoImovel)
        //              .HasMaxLength(255)
        //              .IsRequired(); // Configurações adicionais como obrigatoriedade

        //        entity.Property(e => e.Cep)
        //              .HasMaxLength(255);

        //        entity.Property(e => e.Condominio)
        //              .HasColumnType("decimal(18,2)"); // Formato do decimal no banco de dados

        //        entity.Property(e => e.ValorImovel)
        //              .HasColumnType("decimal(18,2)");

        //        entity.Property(e => e.Bairro)
        //              .HasMaxLength(255);

        //        entity.Property(e => e.Descricao);

        //        entity.Property(e => e.Endereco)
        //              .HasMaxLength(255);

        //        entity.Property(e => e.Complemento)
        //              .HasMaxLength(255);

        //        // Adicionar outras configurações, índices ou relacionamentos se necessário
        //    });
        //}
    }
}