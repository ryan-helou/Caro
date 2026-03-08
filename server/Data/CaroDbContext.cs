using Microsoft.EntityFrameworkCore;
using Caro.Api.Models;

namespace Caro.Api.Data;

public class CaroDbContext : DbContext
{
    public CaroDbContext(DbContextOptions<CaroDbContext> options) : base(options) { }

    public DbSet<Opening> Openings => Set<Opening>();
    public DbSet<User> Users => Set<User>();
    public DbSet<UserProgress> UserProgresses => Set<UserProgress>();
    public DbSet<LessonCompletion> LessonCompletions => Set<LessonCompletion>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>()
            .HasIndex(u => u.LoginKey)
            .IsUnique();

        modelBuilder.Entity<UserProgress>()
            .HasOne(p => p.User)
            .WithMany()
            .HasForeignKey(p => p.UserId)
            .IsRequired();

        modelBuilder.Entity<UserProgress>()
            .HasOne(p => p.Opening)
            .WithMany()
            .HasForeignKey(p => p.OpeningId)
            .IsRequired();

        modelBuilder.Entity<LessonCompletion>()
            .HasOne(lc => lc.User)
            .WithMany()
            .HasForeignKey(lc => lc.UserId)
            .IsRequired();

        modelBuilder.Entity<Opening>().HasData(
            new Opening
            {
                Id = 1,
                Name = "Caro-Kann Defense",
                Eco = "B12",
                Color = "black",
                TreeJson = "{\"san\":\"e4\",\"children\":[{\"san\":\"c6\",\"explanation\":\"The Caro-Kann: Black prepares to play d5 next move, challenging the center while keeping a solid pawn structure.\",\"children\":[{\"san\":\"d4\",\"children\":[{\"san\":\"d5\",\"explanation\":\"Black strikes the center directly. The pawn on c6 supports d5, giving Black a strong central presence.\",\"children\":[{\"san\":\"e5\",\"variationName\":\"Advance Variation\",\"children\":[{\"san\":\"Bf5\",\"explanation\":\"Black develops the light-squared bishop outside the pawn chain before playing e6 \\u2014 a key idea in the Caro-Kann.\",\"children\":[{\"san\":\"Nf3\",\"variationName\":\"Short Classical\",\"children\":[{\"san\":\"e6\",\"explanation\":\"Black solidifies the d5 pawn and prepares to develop the dark-squared bishop. The pawn structure is rock-solid.\",\"children\":[{\"san\":\"Be2\",\"children\":[{\"san\":\"Nd7\",\"explanation\":\"The knight heads to d7, keeping options to go to f6 or b6 later. This is the main line of the Advance Caro-Kann.\",\"children\":[]}]}]}]},{\"san\":\"Nc3\",\"variationName\":\"Bayonet Attack\",\"children\":[{\"san\":\"e6\",\"explanation\":\"Black solidifies d5 and keeps the position solid before White launches the kingside pawn storm.\",\"children\":[{\"san\":\"g4\",\"children\":[{\"san\":\"Bg6\",\"explanation\":\"The bishop retreats to g6, the only safe square. From here it still controls key light squares.\",\"children\":[]}]}]}]}]}]},{\"san\":\"Nc3\",\"variationName\":\"Classical Variation\",\"children\":[{\"san\":\"dxe4\",\"explanation\":\"Black captures the e4 pawn. In the Classical, Black gives up the center temporarily to develop pieces actively.\",\"children\":[{\"san\":\"Nxe4\",\"children\":[{\"san\":\"Bf5\",\"explanation\":\"The main Classical move \\u2014 the bishop develops actively before Black plays e6.\",\"children\":[{\"san\":\"Ng3\",\"children\":[{\"san\":\"Bg6\",\"explanation\":\"The bishop retreats to g6. From here it stays active and monitors the kingside.\",\"children\":[{\"san\":\"h4\",\"children\":[{\"san\":\"h6\",\"explanation\":\"Black stops h5, preventing White from trading the bishop. A critical move in this line.\",\"children\":[{\"san\":\"Nf3\",\"children\":[{\"san\":\"Nd7\",\"explanation\":\"The knight develops to d7, heading for f6 or supporting e5. A flexible developing move.\",\"children\":[]}]}]}]}]}]}]},{\"san\":\"Nd7\",\"explanation\":\"A modern alternative \\u2014 the knight goes to d7 first, keeping flexible development options.\",\"children\":[{\"san\":\"Nf3\",\"children\":[{\"san\":\"Ngf6\",\"explanation\":\"The second knight develops to f6, challenging the e4 knight and fighting for the center.\",\"children\":[{\"san\":\"Ng3\",\"children\":[{\"san\":\"e6\",\"explanation\":\"Black completes the solid pawn structure, preparing to develop the bishop and castle.\",\"children\":[]}]}]}]}]}]}]}]},{\"san\":\"exd5\",\"variationName\":\"Exchange Variation\",\"children\":[{\"san\":\"cxd5\",\"explanation\":\"Black recaptures with the c-pawn, maintaining a solid center. The position is symmetrical but Black has good prospects.\",\"children\":[{\"san\":\"Bd3\",\"variationName\":\"Quiet Exchange\",\"children\":[{\"san\":\"Nc6\",\"explanation\":\"The knight develops to c6, pressuring d4 and developing naturally.\",\"children\":[{\"san\":\"c3\",\"children\":[{\"san\":\"Nf6\",\"explanation\":\"The kingside knight develops to f6, controlling e4 and preparing to castle.\",\"children\":[]}]}]}]},{\"san\":\"c4\",\"variationName\":\"Panov-Botvinnik Attack\",\"children\":[{\"san\":\"Nf6\",\"explanation\":\"The knight develops to f6, putting pressure on the center and preparing rapid development.\",\"children\":[{\"san\":\"Nc3\",\"children\":[{\"san\":\"e6\",\"explanation\":\"Black solidifies d5 and prepares to develop the bishop. This leads to rich IQP middlegame positions.\",\"children\":[]}]}]}]}]}]},{\"san\":\"f3\",\"variationName\":\"Fantasy Variation\",\"children\":[{\"san\":\"dxe4\",\"explanation\":\"Black takes the pawn. After f3, White wants a big center \\u2014 Black should challenge it immediately.\",\"children\":[{\"san\":\"fxe4\",\"children\":[{\"san\":\"e5\",\"explanation\":\"Black strikes at the center while it is overextended. This counterattack is the key idea against the Fantasy.\",\"children\":[{\"san\":\"Nf3\",\"children\":[{\"san\":\"Bg4\",\"explanation\":\"The bishop pins the knight to the queen, increasing pressure on d4 and the center.\",\"children\":[]}]}]}]}]}]}]}]}]}]}"
            }
        );
    }
}
