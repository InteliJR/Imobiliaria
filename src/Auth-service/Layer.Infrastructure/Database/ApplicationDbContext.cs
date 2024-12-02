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

        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Usuarios { get; set; }
        public DbSet<Locador> Locadores { get; set; }
        public DbSet<Locatario> Locatarios { get; set; }

        public DbSet<Colaborador> Colaboradores { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Relacionamento 1:1 entre User e Locador
            modelBuilder.Entity<User>()
                .HasOne(u => u.Locador)
                .WithOne(l => l.User)
                .HasForeignKey<Locador>(l => l.UsuarioId);

            // Relacionamento 1:1 entre User e Locatario
            modelBuilder.Entity<User>()
                .HasOne(u => u.Locatario)
                .WithOne(l => l.User)
                .HasForeignKey<Locatario>(l => l.UsuarioId);

            // Relacionamento 1:1 entre User e Colaborador
            modelBuilder.Entity<User>()
                .HasOne(u => u.Colaborador)
                .WithOne(c => c.User)
                .HasForeignKey<Colaborador>(c => c.UsuarioId);

            base.OnModelCreating(modelBuilder);
        }

    }

}
