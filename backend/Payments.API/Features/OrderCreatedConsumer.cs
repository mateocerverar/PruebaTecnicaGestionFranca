using MassTransit;
using Payments.API.Domain;
using Payments.API.Infrastructure;
using Shared.Kernel;

namespace Payments.API.Features;

public class OrderCreatedConsumer : IConsumer<OrderCreatedEvent>
{
    private readonly PaymentsDbContext _context;
    private readonly ILogger<OrderCreatedConsumer> _logger;

    public OrderCreatedConsumer(PaymentsDbContext context, ILogger<OrderCreatedConsumer> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task Consume(ConsumeContext<OrderCreatedEvent> context)
    {
        var message = context.Message;
        _logger.LogInformation($"Processing payment for Order {message.OrderId} with amount {message.TotalAmount}");

        // Simulate processing
        var payment = new Payment(message.OrderId, message.TotalAmount);
        
        _context.Payments.Add(payment);
        await _context.SaveChangesAsync();

        _logger.LogInformation($"Payment processed successfully. Payment ID: {payment.Id}");
    }
}
