public class User
{
    public int Id { get; set; } // Add UserId field
    public string Username { get; set; }
    public string Password { get; set; } // This will store the hashed password
    public string Email { get; set; }
    public string PreferredCurrency { get; set; } // Add this property
}
