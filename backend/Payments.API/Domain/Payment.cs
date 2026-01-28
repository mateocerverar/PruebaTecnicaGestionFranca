using Shared.Kernel;

namespace Payments.API.Domain;

public class Payment : Entity
{
    public Guid OrderId { get; private set; }
    public decimal Amount { get; private set; }
    public string Status { get; private set; } // "Processed"
    public DateTime ProcessedAt { get; private set; }

    public Payment(Guid orderId, decimal amount)
    {
        OrderId = orderId;
        Amount = amount;
        Status = "Processed";
        ProcessedAt = DateTime.UtcNow;
    }
    
    protected Payment() { }
}
