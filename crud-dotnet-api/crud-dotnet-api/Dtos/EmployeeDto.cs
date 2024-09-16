using crud_dotnet_api.Data;

namespace crud_dotnet_api.Dtos
{
    public class EmployeeDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string NIC { get; set; }
        public string Password { get; set; }
        public Plant Plant { get; set; }
        public string UserType { get; set; }

    }
}
