using Microsoft.AspNetCore.Mvc;

namespace Payments.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PaymentsController : ControllerBase
{
    [HttpGet("health")]
    public IActionResult Health() => Ok("Payments Service is Healthy");

    [HttpGet("status")]
    public IActionResult Status() => Ok("Payments Service is Running");
}
