using DAL.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DAL.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public DbSet<Wedding> Weddings { get; set; }

        public DbSet<Picture> Pictures { get; set; }

        public DbSet<Guest> Guests { get; set; }

        public DbSet<TaskGroup> TaskGroups { get; set; }

        public DbSet<Task> Tasks { get; set; }

        public DbSet<Comment> Comments { get; set; }

        public DbSet<TaskGroupHierarchy> TaskGroupHierarchy { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Wedding>()
                        .HasOne(a => a.User)
                        .WithOne(a => a.Wedding)
                        .HasForeignKey<ApplicationUser>(u => u.WeddingId);


            modelBuilder.Entity<TaskGroupHierarchy>()
                        .HasOne(x => x.TaskGroup)
                        .WithMany(x => x.Before)
                        .HasForeignKey(h => h.TaskGroupId)
                        .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<TaskGroupHierarchy>()
                        .HasOne(x => x.Required)
                        .WithMany(x => x.After)
                        .HasForeignKey(x => x.RequiredId)
                        .OnDelete(DeleteBehavior.Restrict);

        }

    }
}
