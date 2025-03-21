using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Layer.Domain.Entities;
using Layer.Domain.Entites;
using Microsoft.EntityFrameworkCore.Metadata.Builders; // Necessário para usar HasColumnType


namespace Layer.Infrastructure.Database
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Imoveis> Imoveis { get; set; }
        public DbSet<Contratos> Contratos { get; set; }
        public DbSet<Chamados> Chamados { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Contratos>()
                .Property(c => c.DataReajuste);
            base.OnModelCreating(modelBuilder);
        }
    }
}