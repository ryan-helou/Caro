namespace Caro.Api.Models;

public class UserProgress
{
    public int Id { get; set; }
    public int OpeningId { get; set; }
    public double PracticeAccuracy { get; set; }
    public int MovesCompleted { get; set; }
    public DateTime? LastPracticed { get; set; }

    public Opening? Opening { get; set; }
}
