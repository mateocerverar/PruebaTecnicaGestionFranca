using MediatR;
using MassTransit;
using Orders.API.Domain;
using Orders.API.Infrastructure;
using Shared.Kernel;

namespace Orders.API.Features;

public record CreateOrderCommand(string Product, decimal Price) : IRequest<Guid>;

public class CreateOrderHandler : IRequestHandler<CreateOrderCommand, Guid>
{
    private readonly OrdersDbContext _context;
    private readonly IPublishEndpoint _publishEndpoint;

    public CreateOrderHandler(OrdersDbContext context, IPublishEndpoint publishEndpoint)
    {
        _context = context;
        _publishEndpoint = publishEndpoint;
    }

    public async Task<Guid> Handle(CreateOrderCommand request, CancellationToken cancellationToken)
    {
        // For this demo, we generate a random UserId since it's not passed from frontend
        var userId = Guid.NewGuid(); 
        var order = new Order(userId, request.Product, request.Price);
        
        _context.Orders.Add(order);
        await _context.SaveChangesAsync(cancellationToken);

        // Publish Event
        await _publishEndpoint.Publish(new OrderCreatedEvent(order.Id, order.UserId, order.TotalAmount, order.OrderDate), cancellationToken);

        return order.Id;
    }
}
