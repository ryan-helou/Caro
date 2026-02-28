namespace Caro.Api.Dtos;

public class OpeningDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Eco { get; set; } = string.Empty;
    public string Color { get; set; } = "white";
    public string[] Moves { get; set; } = Array.Empty<string>();
    public Dictionary<string, string> Explanations { get; set; } = new();
}

public class ProgressDto
{
    public int Id { get; set; }
    public int OpeningId { get; set; }
    public string OpeningName { get; set; } = string.Empty;
    public double PracticeAccuracy { get; set; }
    public int MovesCompleted { get; set; }
    public DateTime? LastPracticed { get; set; }
}

public class SubmitMoveRequest
{
    public int OpeningId { get; set; }
    public int MoveIndex { get; set; }
    public string Move { get; set; } = string.Empty;
}

public class SubmitMoveResponse
{
    public bool Correct { get; set; }
    public string ExpectedMove { get; set; } = string.Empty;
    public string Explanation { get; set; } = string.Empty;
}

public class UpdateProgressRequest
{
    public int OpeningId { get; set; }
    public double PracticeAccuracy { get; set; }
    public int MovesCompleted { get; set; }
}
