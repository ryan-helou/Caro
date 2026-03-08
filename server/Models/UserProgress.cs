namespace Caro.Api.Models;

public class UserProgress
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int OpeningId { get; set; }
    public double PracticeAccuracy { get; set; }
    public int MovesCompleted { get; set; }
    public DateTime? LastPracticed { get; set; }

    public User? User { get; set; }
    public Opening? Opening { get; set; }
}

public class LessonCompletion
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int OpeningId { get; set; }
    public int LessonId { get; set; }
    public DateTime CompletedAt { get; set; } = DateTime.UtcNow;

    public User? User { get; set; }
}
