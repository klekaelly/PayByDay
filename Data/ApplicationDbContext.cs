using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PayByDay.Models;

namespace PayByDay.Data;

public class ApplicationDbContext : IdentityDbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Purchase> Purchases { get; set; }
    public DbSet<Goal> Goals { get; set; }
    public DbSet<Expense> Expenses { get; set; }
    
    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.Entity<Expense>()
            .Property(e => e.Frequency)
            .HasConversion<string>(); // Store enum as string in the database
    }
}
