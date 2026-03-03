using Microsoft.AspNetCore.Mvc;
using Caro.Api.Data;

namespace Caro.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PracticeController : ControllerBase
{
    private readonly CaroDbContext _db;

    public PracticeController(CaroDbContext db) => _db = db;
}
