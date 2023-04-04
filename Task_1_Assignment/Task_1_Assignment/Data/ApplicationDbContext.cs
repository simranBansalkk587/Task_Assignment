using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Task_1_Assignment.Models;

namespace Task_1_Assignment.Data
{
  public class ApplicationDbContext : DbContext
  {
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {

    }
    public DbSet<Employee> Employees { get; set; }
    public DbSet<User> Users { get; set; }

    public override int SaveChanges()
    {
      foreach (var entry in ChangeTracker.Entries().Where(e => e.State == EntityState.Deleted))
      {

        entry.State = EntityState.Modified;
        entry.CurrentValues.SetValues(new { IsDeleted = true });
      }

      return base.SaveChanges();
    }


  }

}

