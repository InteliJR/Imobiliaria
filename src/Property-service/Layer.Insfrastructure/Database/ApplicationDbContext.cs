using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Layer.Domain.Entities;
using Layer.Domain.Entites;

namespace Layer.Infrastructure.Database
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        // Mapear a tabela de imoveis
        public DbSet<Imoveis> Imoveis { get; set; }
        public DbSet<Contratos> Contratos { get; set; }

        public DbSet<Usuarios> Usuarios { get; }
    }
}