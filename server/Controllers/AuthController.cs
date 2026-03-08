using System.Security.Cryptography;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Caro.Api.Data;
using Caro.Api.Models;

namespace Caro.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly CaroDbContext _db;

    public AuthController(CaroDbContext db) => _db = db;

    [HttpPost("register")]
    public async Task<ActionResult<AuthResponse>> Register([FromBody] RegisterRequest? request)
    {
        var key = string.IsNullOrWhiteSpace(request?.LoginKey) ? GenerateKey() : request.LoginKey.Trim();

        if (key.Length < 4) return BadRequest("Key must be at least 4 characters");
        if (key.Length > 64) return BadRequest("Key must be at most 64 characters");

        var taken = await _db.Users.AnyAsync(u => u.LoginKey == key);
        if (taken) return Conflict("That key is already taken");

        var user = new User { LoginKey = key };
        _db.Users.Add(user);
        await _db.SaveChangesAsync();

        return new AuthResponse { LoginKey = key };
    }

    [HttpPost("login")]
    public async Task<ActionResult<AuthResponse>> Login([FromBody] LoginRequest request)
    {
        var user = await _db.Users.FirstOrDefaultAsync(u => u.LoginKey == request.LoginKey);
        if (user == null) return Unauthorized("Invalid login key");

        return new AuthResponse { LoginKey = user.LoginKey };
    }

    [HttpPut("key")]
    public async Task<ActionResult<AuthResponse>> UpdateKey([FromBody] UpdateKeyRequest request)
    {
        var currentKey = Request.Headers["X-Login-Key"].FirstOrDefault();
        if (string.IsNullOrEmpty(currentKey)) return Unauthorized();

        var user = await _db.Users.FirstOrDefaultAsync(u => u.LoginKey == currentKey);
        if (user == null) return Unauthorized();

        var newKey = request.NewKey?.Trim() ?? "";
        if (newKey.Length < 4) return BadRequest("Key must be at least 4 characters");
        if (newKey.Length > 64) return BadRequest("Key must be at most 64 characters");

        var taken = await _db.Users.AnyAsync(u => u.LoginKey == newKey && u.Id != user.Id);
        if (taken) return Conflict("That key is already taken");

        user.LoginKey = newKey;
        await _db.SaveChangesAsync();

        return new AuthResponse { LoginKey = newKey };
    }

    private static string GenerateKey()
    {
        var bytes = RandomNumberGenerator.GetBytes(16);
        return Convert.ToBase64String(bytes)
            .Replace("+", "")
            .Replace("/", "")
            .Replace("=", "")
            .Substring(0, 16)
            .ToUpperInvariant();
    }
}

public class RegisterRequest
{
    public string? LoginKey { get; set; }
}

public class LoginRequest
{
    public string LoginKey { get; set; } = string.Empty;
}

public class UpdateKeyRequest
{
    public string NewKey { get; set; } = string.Empty;
}

public class AuthResponse
{
    public string LoginKey { get; set; } = string.Empty;
}
