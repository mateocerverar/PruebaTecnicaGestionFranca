using MediatR;

namespace Shared.Kernel;

public interface IDomainEvent : INotification
{
    DateTime OccurredOn { get; }
}
