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
    public class ApplicationDbContext : DbContext
    {

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Usuarios { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().ToTable("usuarios");
        }
    }

}
