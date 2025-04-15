using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Layer.Domain.Entities;
using Microsoft.Extensions.Configuration;

namespace Layer.Infrastructure.Database
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        // DbSet para Pagamentos
        public DbSet<Payment> Pagamentos { get; set; }


        public DbSet<Contratos> Contratos { get; set; }

        public DbSet<Rent> Alugueis { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Mapeamento para Pagamentos
            modelBuilder.Entity<Payment>()
            .ToTable("pagamentos")
            .HasOne(p => p.Contrato)
            .WithMany()      
            .HasForeignKey(p => p.ContratoId);

        }
    }
}
