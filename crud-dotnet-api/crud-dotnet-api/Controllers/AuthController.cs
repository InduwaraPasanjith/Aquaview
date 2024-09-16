using crud_dotnet_api.Data;
using crud_dotnet_api.Model;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Org.BouncyCastle.Crypto.Generators;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace crud_dotnet_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly EmployeeRepository _employeeRepository;
        private readonly JwtOption _options;

        public AuthController(EmployeeRepository employeeRepository, IOptions<JwtOption> options)
        {
            _employeeRepository = employeeRepository;
            _options = options.Value;
        }
        [HttpPost("login")]
        public async Task<ActionResult> Login([FromBody] LoginDto model)
        {
            var employee = await _employeeRepository.GetEmplaoyeeByEmail(model.Email);
            if (employee is null)
            {
                return BadRequest(new { error = "email does not exist" });
            }
            if (employee.Password != model.Password)
            {
                return BadRequest(new { error = "email/password is incorrect." });
            }
            var token = GetJWTToken(model.Email);
            return Ok(new { token = token });
        }

        [HttpPost("resetPassword")]
        public async Task<ActionResult> resetPassword([FromBody] resetPassword model)
        {
            if (model == null || string.IsNullOrEmpty(model.currentPassword) || string.IsNullOrEmpty(model.newPassword))
            {
                return BadRequest("Invalid input.");
            }

            try
            {
                // Assuming you get the employeeId from the token or logged-in user
                //var employeeId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
                // Extract the email from the JWT token
                var email = User.FindFirstValue("Email");
                if (string.IsNullOrEmpty(email))
                {
                    return Unauthorized("Invalid token.");
                }

                // Call the service to reset the password
                await _employeeRepository.ResetPasswordAsync(email, model.currentPassword, model.newPassword);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok("Password reset successfully.");
        
    }

        private string GetJWTToken(string email)
        {
            var jwtKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_options.Key));
            var crendential = new SigningCredentials(jwtKey, SecurityAlgorithms.HmacSha256);
            List<Claim> claims = new List<Claim>()
            {
                new Claim("Email",email)
            };
            var sToken = new JwtSecurityToken(_options.Key, _options.Issuer, claims, expires: DateTime.Now.AddHours(5), signingCredentials: crendential);
            var token = new JwtSecurityTokenHandler().WriteToken(sToken);
            return token;
        }
        /*[HttpPost("google-login")]
        public async Task<ActionResult> GoogleLogin([FromBody] GoogleLoginDto model)
        {
            var idtoken = model.IdToken;
            var setting = new GoogleJsonWebSignature.ValidationSettings
            {
                Audience = new string[] { "Your_GoogleApp_ClientID" }
            };
            var result = await GoogleJsonWebSignature.ValidateAsync(idtoken, setting);
            if (result is null)
            {
                return BadRequest();
            }
            var token = GetJWTToken(result.Email);
            return Ok(new { token = token });
        }*/




    }
}
