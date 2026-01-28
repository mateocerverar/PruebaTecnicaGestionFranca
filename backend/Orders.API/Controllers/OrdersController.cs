using MediatR;
using Microsoft.AspNetCore.Mvc;
using Orders.API.Features;

namespace Orders.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    private readonly IMediator _mediator;

    public OrdersController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    public async Task<IActionResult> CreateOrder([FromBody] CreateOrderCommand command)
    {
        var orderId = await _mediator.Send(command);
        return CreatedAtAction(nameof(GetStatus), new { id = orderId }, new { id = orderId });
    }

    [HttpGet("status")] // Minimal endpoint just to satisfy CreatedAtAction and requirement
    public IActionResult GetStatus() => Ok("Orders Service is Running");
    
    [HttpGet("health")]
    public IActionResult Health() => Ok("Orders Service is Healthy");
}
