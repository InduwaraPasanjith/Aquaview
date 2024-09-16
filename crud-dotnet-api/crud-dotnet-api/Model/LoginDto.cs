namespace crud_dotnet_api.Model
{
    public class LoginDto
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class GoogleLoginDto
    {
        public string IdToken { get; set; }
    }

    public class resetPassword()
    {
        public string currentPassword { get; set; }
        public string newPassword { get; set; }
    }

}
