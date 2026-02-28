using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Caro.Api.Data;
using Caro.Api.Dtos;

namespace Caro.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PracticeController : ControllerBase
{
    private readonly CaroDbContext _db;

    public PracticeController(CaroDbContext db) => _db = db;

    [HttpPost("submit")]
    public async Task<ActionResult<SubmitMoveResponse>> Submit([FromBody] SubmitMoveRequest request)
    {
        var opening = await _db.Openings.FindAsync(request.OpeningId);
        if (opening == null) return NotFound("Opening not found");

        var moves = JsonSerializer.Deserialize<string[]>(opening.MovesJson) ?? Array.Empty<string>();
        var explanations = JsonSerializer.Deserialize<Dictionary<string, string>>(opening.ExplanationsJson) ?? new();

        if (request.MoveIndex < 0 || request.MoveIndex >= moves.Length)
            return BadRequest("Invalid move index");

        var expected = moves[request.MoveIndex];
        var isCorrect = request.Move == expected;

        explanations.TryGetValue(expected, out var explanation);

        return new SubmitMoveResponse
        {
            Correct = isCorrect,
            ExpectedMove = expected,
            Explanation = explanation ?? ""
        };
    }
}
