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

        // Mapear a tabela de usuarios
        public DbSet<User> Usuarios { get; set; }
    }
}
