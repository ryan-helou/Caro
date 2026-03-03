using System.Text.Json;

namespace Caro.Api.Dtos;

public class OpeningDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Eco { get; set; } = string.Empty;
    public string Color { get; set; } = "white";
    public JsonElement Tree { get; set; }
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

public class UpdateProgressRequest
{
    public int OpeningId { get; set; }
    public double PracticeAccuracy { get; set; }
    public int MovesCompleted { get; set; }
}
