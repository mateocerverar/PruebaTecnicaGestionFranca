using Shared.Kernel;

namespace Orders.API.Domain;

public class Order : Entity
{
    public Guid UserId { get; private set; }
    public string Product { get; private set; }
    public decimal TotalAmount { get; private set; }
    public string Status { get; private set; } // "Created", "Paid"
    public DateTime OrderDate { get; private set; }

    public Order(Guid userId, string product, decimal totalAmount)
    {
        UserId = userId;
        Product = product;
        TotalAmount = totalAmount;
        Status = "Created";
        OrderDate = DateTime.UtcNow;
    }

    public void MarkAsPaid()
    {
        Status = "Paid";
    }

    protected Order() { }
}
