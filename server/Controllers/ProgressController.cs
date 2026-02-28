using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Caro.Api.Data;
using Caro.Api.Dtos;
using Caro.Api.Models;

namespace Caro.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProgressController : ControllerBase
{
    private readonly CaroDbContext _db;

    public ProgressController(CaroDbContext db) => _db = db;

    [HttpGet]
    public async Task<ActionResult<List<ProgressDto>>> GetAll()
    {
        var progresses = await _db.UserProgresses
            .Include(p => p.Opening)
            .ToListAsync();

        return progresses.Select(p => new ProgressDto
        {
            Id = p.Id,
            OpeningId = p.OpeningId,
            OpeningName = p.Opening?.Name ?? "Unknown",
            PracticeAccuracy = p.PracticeAccuracy,
            MovesCompleted = p.MovesCompleted,
            LastPracticed = p.LastPracticed
        }).ToList();
    }

    [HttpPost]
    public async Task<ActionResult<ProgressDto>> Upsert([FromBody] UpdateProgressRequest request)
    {
        var openingExists = await _db.Openings.AnyAsync(o => o.Id == request.OpeningId);
        if (!openingExists) return NotFound("Opening not found");

        var existing = await _db.UserProgresses
            .Include(p => p.Opening)
            .FirstOrDefaultAsync(p => p.OpeningId == request.OpeningId);

        if (existing != null)
        {
            existing.PracticeAccuracy = request.PracticeAccuracy;
            existing.MovesCompleted += request.MovesCompleted;
            existing.LastPracticed = DateTime.UtcNow;
        }
        else
        {
            existing = new UserProgress
            {
                OpeningId = request.OpeningId,
                PracticeAccuracy = request.PracticeAccuracy,
                MovesCompleted = request.MovesCompleted,
                LastPracticed = DateTime.UtcNow
            };
            _db.UserProgresses.Add(existing);
        }

        await _db.SaveChangesAsync();

        // Reload with opening
        await _db.Entry(existing).Reference(p => p.Opening).LoadAsync();

        return new ProgressDto
        {
            Id = existing.Id,
            OpeningId = existing.OpeningId,
            OpeningName = existing.Opening?.Name ?? "Unknown",
            PracticeAccuracy = existing.PracticeAccuracy,
            MovesCompleted = existing.MovesCompleted,
            LastPracticed = existing.LastPracticed
        };
    }
}
