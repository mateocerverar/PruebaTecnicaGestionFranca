using Shared.Kernel;

namespace Users.API.Domain;

public class User : Entity
{
    public string Username { get; private set; }
    public string Password { get; private set; } // Plaintext for demo/simulation as per instructions
    public string Role { get; private set; } // "Admin" or "User"

    public User(string username, string password, string role)
    {
        Username = username;
        Password = password;
        Role = role;
    }

    // EF Constructor
    protected User() { }
}
