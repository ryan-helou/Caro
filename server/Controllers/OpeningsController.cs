using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Caro.Api.Data;
using Caro.Api.Dtos;

namespace Caro.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OpeningsController : ControllerBase
{
    private readonly CaroDbContext _db;

    public OpeningsController(CaroDbContext db) => _db = db;

    [HttpGet]
    public async Task<ActionResult<List<OpeningDto>>> GetAll()
    {
        var openings = await _db.Openings.ToListAsync();
        return openings.Select(o => new OpeningDto
        {
            Id = o.Id,
            Name = o.Name,
            Eco = o.Eco,
            Color = o.Color,
            Tree = JsonSerializer.Deserialize<JsonElement>(o.TreeJson)
        }).ToList();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<OpeningDto>> GetById(int id)
    {
        var o = await _db.Openings.FindAsync(id);
        if (o == null) return NotFound();

        return new OpeningDto
        {
            Id = o.Id,
            Name = o.Name,
            Eco = o.Eco,
            Color = o.Color,
            Tree = JsonSerializer.Deserialize<JsonElement>(o.TreeJson)
        };
    }
}
