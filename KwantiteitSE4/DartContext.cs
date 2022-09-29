using Microsoft.EntityFrameworkCore;
using KwantiteitSE4.Models;

namespace KwantiteitSE4
{
    public class DartContext : DbContext
    {
        public DartContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Player> players { get; set; }
        public DbSet<Game> games { get; set; }
        public DbSet<Set> sets { get; set; }
        public DbSet<Leg> legs { get; set; }
        public DbSet<Turn> turns { get; set; }
        public DbSet<Throw> throws { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Player>().ToTable("Player");

            modelBuilder.Entity<Game>().ToTable("Game")
                .HasOne<Player>(g => g.player1).WithMany().HasForeignKey(g => g.player1ID);
            modelBuilder.Entity<Game>().ToTable("Game")
                .HasOne<Player>(g => g.player2).WithMany().HasForeignKey(g => g.player2ID);
            modelBuilder.Entity<Game>().ToTable("Game")
                .HasOne<Player>(g => g.winner).WithMany().HasForeignKey(g => g.winnerID);

            modelBuilder.Entity<Set>().ToTable("Set")
                .HasOne(s => s.game).WithMany(g => g.sets).HasForeignKey(s => s.gameID);

            modelBuilder.Entity<Leg>().ToTable("Leg")
                .HasOne(l => l.set).WithMany(s => s.legs).HasForeignKey(l => l.setID);

            modelBuilder.Entity<Turn>().ToTable("Turn")
                .HasOne(t => t.leg).WithMany(l => l.turns).HasForeignKey(t => t.legID);

            modelBuilder.Entity<Throw>().ToTable("Throw")
                .HasOne(t => t.turn).WithMany(t => t.throws).HasForeignKey(t => t.turnID);
        }
    }
}
