using MediatR;
using Microsoft.AspNetCore.Mvc;
using Users.API.Features;

namespace Users.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly IMediator _mediator;

    public UsersController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginCommand command)
    {
        var role = await _mediator.Send(command);
        if (role == null) return Unauthorized(new { message = "Invalid credentials" });
        
        return Ok(new { token = "simulated-jwt-token", role = role });
    }

    [HttpGet("health")]
    public IActionResult Health() => Ok("Users Service is Healthy");

    [HttpGet("status")]
    public IActionResult Status() => Ok(new { status = "Running", timestamp = DateTime.UtcNow });
}
