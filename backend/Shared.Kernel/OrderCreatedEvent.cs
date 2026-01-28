namespace Shared.Kernel;

public record OrderCreatedEvent(Guid OrderId, Guid UserId, decimal TotalAmount, DateTime CreatedAt);
