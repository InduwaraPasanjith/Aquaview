using crud_dotnet_api.Dtos;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Crypto.Generators;
using System;

namespace crud_dotnet_api.Data
{
    public class EmployeeRepository
    {
        private readonly AppDbContext _appDbContext;
        private EmailRepository emailRepository;

        public EmployeeRepository(AppDbContext appDbContext, EmailRepository emailRepository)
        {
            _appDbContext = appDbContext;
            this.emailRepository = emailRepository;

        }

        public async Task AddEmployeeAsync(EmployeeDto employee)
        {
            try
            {
                Employee employe = new Employee();
                employe.Name = employee.Name;
                employe.Email = employee.Email;
                employe.Phone = employee.Phone;
                employe.NIC = employee.NIC;
                employe.Address = employee.Address;
                employe.PlantId = employee.Plant.Id;
                employe.UserType = employee.UserType;
                employe.Password = GeneratePassword();
                await _appDbContext.Set<Employee>().AddAsync(employe);
                await _appDbContext.SaveChangesAsync();

                Mailrequest mailrequest = new Mailrequest();
                mailrequest.Email = employee.Email;
                mailrequest.Subject = "User Registation";
                mailrequest.Emailbody = "User Login Password : " + employee.Password;

                await emailRepository.SendEmail(mailrequest);
            }
            catch (Exception ex)
            {

                throw;
            }
            
        }
        internal string GeneratePassword()
        {
            var password = "";
            try
            {
                Random random = new Random();
                password = random.Next(0, 100000).ToString("D5");
            }
            catch (Exception ex)
            {

                throw;
            }
            return password;
        }

        public async Task<List<EmployeeDto>> GetAllEmployeeAsync()
        {
            List<EmployeeDto> employeeDtos = new List<EmployeeDto>();
            //EmployeeDto employeeDto = new EmployeeDto();
            List<Employee> employees = await _appDbContext.Employees.ToListAsync();
            foreach (var item in employees)
            {
                EmployeeDto employeeDto = new EmployeeDto();
                employeeDto.Id = item.Id;
                employeeDto.Name = item.Name;
                employeeDto.Email = item.Email;
                employeeDto.Phone = item.Phone;
                employeeDto.NIC = item.NIC;
                employeeDto.Address = item.Address;
                employeeDto.Plant = await _appDbContext.Plants.FindAsync(item.PlantId);
                employeeDto.UserType = item.UserType;
               
                employeeDtos.Add(employeeDto);
            }
            return employeeDtos;
        }
             
        public async Task<EmployeeDto> GetEmployeeByIdAsync(int id)
        {
            EmployeeDto employeeDto = new EmployeeDto();
            Employee employee = await _appDbContext.Employees.FindAsync(id);
            employeeDto.Id = employee.Id;
            employeeDto.Name = employee.Name;
            employeeDto.Email = employee.Email;
            employeeDto.Phone = employee.Phone;
            employeeDto.NIC = employee.NIC;
            employeeDto.Address = employee.Address;
            employeeDto.Plant = await _appDbContext.Plants.FindAsync(employee.PlantId);
            employeeDto.UserType = employee.UserType;
            return employeeDto;
        }

        public async Task<EmployeeDto> GetEmployeeByEmailAsync(string email)
        {
            // Retrieve employee by email
            var employee = await _appDbContext.Employees
                .Where(e => e.Email == email)
                .FirstOrDefaultAsync();

            if (employee == null)
            {
                return null; // or handle the case when the employee is not found
            }

            // Map the Employee entity to EmployeeDto
            EmployeeDto employeeDto = new EmployeeDto
            {
                Id = employee.Id,
                Name = employee.Name,
                Email = employee.Email,
                Phone = employee.Phone,
                NIC = employee.NIC,
                Address = employee.Address,
                Plant = await _appDbContext.Plants.FindAsync(employee.PlantId),
                UserType = employee.UserType
            };

            return employeeDto;
        }

        public async Task UpdateEmployeeAsync(int id,  EmployeeDto employee)
        {
            var employe = await _appDbContext.Employees.FindAsync(id);
            if(employe == null)
            {
                throw new Exception("Employee not found");
            }
            employe.Name = employee.Name;
            employe.Email = employee.Email;
            employe.Phone = employee.Phone;
            employe.NIC = employee.NIC;
            employe.Address = employee.Address;
            employe.PlantId = employee.Plant.Id;
            employe.UserType = employee.UserType;
            await _appDbContext.SaveChangesAsync();
        }

        public async Task DeleteEmployeeAsnyc(int id)
        {
            var employeee = await _appDbContext.Employees.FindAsync(id);
            if (employeee == null)
            {
                throw new Exception("Employee not found");
            }
            _appDbContext.Employees.Remove(employeee);
            await _appDbContext.SaveChangesAsync();
        }

        public async Task<Employee> GetEmplaoyeeByEmail(string email)
        {
            return await _appDbContext.Employees.Where(x => x.Email == email).FirstOrDefaultAsync();
        }

        public async Task<Employee> EmployeeByIdAsync(int employeeId)
        {
            return await _appDbContext.Employees.FindAsync(employeeId);
        }

        public async Task UpdateEmployeeAsync(Employee employee)
        {
            _appDbContext.Employees.Update(employee);
            await _appDbContext.SaveChangesAsync();
        }

        public async Task ResetPasswordAsync(string email, string currentPassword, string newPassword)
        {
            // Retrieve the employee by email
            Employee employee = await _appDbContext.Employees
                .Where(e => e.Email == email)
                .FirstOrDefaultAsync();

            if (employee == null)
            {
                throw new Exception("Employee not found");
            }

            // Optionally: Validate the current password (if you are storing hashed passwords, you need to check the hash)
            // if (!BCrypt.Net.BCrypt.Verify(currentPassword, employee.Password))
            // {
            //     throw new Exception("Current password is incorrect");
            // }

            // Hash the new password
            employee.Password = newPassword;

            // Update the employee's password in the database
            _appDbContext.Employees.Update(employee);
            await _appDbContext.SaveChangesAsync();
        }



    }
}
