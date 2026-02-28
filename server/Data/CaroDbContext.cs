using Microsoft.EntityFrameworkCore;
using Caro.Api.Models;

namespace Caro.Api.Data;

public class CaroDbContext : DbContext
{
    public CaroDbContext(DbContextOptions<CaroDbContext> options) : base(options) { }

    public DbSet<Opening> Openings => Set<Opening>();
    public DbSet<UserProgress> UserProgresses => Set<UserProgress>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<UserProgress>()
            .HasOne(p => p.Opening)
            .WithMany()
            .HasForeignKey(p => p.OpeningId)
            .IsRequired();

        modelBuilder.Entity<Opening>().HasData(
            new Opening
            {
                Id = 1,
                Name = "Caro-Kann Defense",
                Eco = "B12",
                Color = "black",
                MovesJson = "[\"e4\",\"c6\",\"d4\",\"d5\",\"e5\",\"Bf5\",\"Nf3\",\"e6\",\"Be2\",\"Nd7\"]",
                ExplanationsJson = "{\"c6\":\"The Caro-Kann: Black prepares to play d5 next move, challenging the center while keeping a solid pawn structure.\",\"d5\":\"Black strikes the center directly. The pawn on c6 supports d5, giving Black a strong central presence.\",\"Bf5\":\"The Advance Variation. Black develops the light-squared bishop outside the pawn chain before playing e6 — a key idea in the Caro-Kann.\",\"e6\":\"Black solidifies the d5 pawn and prepares to develop the dark-squared bishop. The pawn structure is rock-solid.\",\"Nd7\":\"The knight heads to d7, keeping options to go to f6 or b6 later. This is the main line of the Advance Caro-Kann.\"}"
            }
        );
    }
}
