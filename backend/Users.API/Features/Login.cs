using MediatR;
using Users.API.Domain;
using Users.API.Infrastructure;

namespace Users.API.Features;

// Commands
public record LoginCommand(string Username, string Password) : IRequest<string?>; 

// Handler
public class LoginHandler : IRequestHandler<LoginCommand, string?>
{
    private readonly UsersDbContext _context;

    public LoginHandler(UsersDbContext context)
    {
        _context = context;
    }

    public async Task<string?> Handle(LoginCommand request, CancellationToken cancellationToken)
    {
        // Simple simulation: Check DB
        var user = await Microsoft.EntityFrameworkCore.EntityFrameworkQueryableExtensions.FirstOrDefaultAsync(_context.Users, u => u.Username == request.Username && u.Password == request.Password, cancellationToken);
        
        if (user == null) return null;

        return user.Role; // Return Role as "Token" for simulation
    }
}
