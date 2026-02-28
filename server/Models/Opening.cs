namespace Caro.Api.Models;

public class Opening
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Eco { get; set; } = string.Empty;
    public string Color { get; set; } = "white";
    public string MovesJson { get; set; } = "[]";
    public string ExplanationsJson { get; set; } = "{}";
}
