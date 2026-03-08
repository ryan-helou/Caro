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

    private async Task<User?> GetUser()
    {
        var key = Request.Headers["X-Login-Key"].FirstOrDefault();
        if (string.IsNullOrEmpty(key)) return null;
        return await _db.Users.FirstOrDefaultAsync(u => u.LoginKey == key);
    }

    [HttpGet]
    public async Task<ActionResult<List<ProgressDto>>> GetAll()
    {
        var user = await GetUser();
        if (user == null) return Unauthorized();

        var progresses = await _db.UserProgresses
            .Where(p => p.UserId == user.Id)
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
        var user = await GetUser();
        if (user == null) return Unauthorized();

        var openingExists = await _db.Openings.AnyAsync(o => o.Id == request.OpeningId);
        if (!openingExists) return NotFound("Opening not found");

        var existing = await _db.UserProgresses
            .Include(p => p.Opening)
            .FirstOrDefaultAsync(p => p.UserId == user.Id && p.OpeningId == request.OpeningId);

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
                UserId = user.Id,
                OpeningId = request.OpeningId,
                PracticeAccuracy = request.PracticeAccuracy,
                MovesCompleted = request.MovesCompleted,
                LastPracticed = DateTime.UtcNow
            };
            _db.UserProgresses.Add(existing);
        }

        await _db.SaveChangesAsync();
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

    // --- Lesson completions ---

    [HttpGet("lessons/{openingId}")]
    public async Task<ActionResult<List<int>>> GetCompletedLessons(int openingId)
    {
        var user = await GetUser();
        if (user == null) return Unauthorized();

        var ids = await _db.LessonCompletions
            .Where(lc => lc.UserId == user.Id && lc.OpeningId == openingId)
            .Select(lc => lc.LessonId)
            .ToListAsync();

        return ids;
    }

    [HttpPost("lessons")]
    public async Task<ActionResult> CompleteLessons([FromBody] CompleteLessonRequest request)
    {
        var user = await GetUser();
        if (user == null) return Unauthorized();

        var existing = await _db.LessonCompletions
            .AnyAsync(lc => lc.UserId == user.Id && lc.OpeningId == request.OpeningId && lc.LessonId == request.LessonId);

        if (!existing)
        {
            _db.LessonCompletions.Add(new LessonCompletion
            {
                UserId = user.Id,
                OpeningId = request.OpeningId,
                LessonId = request.LessonId
            });
            await _db.SaveChangesAsync();
        }

        return Ok();
    }
}
