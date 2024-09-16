using crud_dotnet_api.Dtos;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
using MailKit.Net.Smtp;

namespace crud_dotnet_api.Data
{
    public class EmailRepository
    {
        private readonly EmailSettings emailSettings;
        
        public EmailRepository(IOptions<EmailSettings> options) { 
            this.emailSettings = options.Value;
        }
        public async Task SendEmail(Mailrequest mailrequest)
        {
            var email = new MimeMessage();
            email.Sender = MailboxAddress.Parse(emailSettings.Email);
            email.To.Add(MailboxAddress.Parse(mailrequest.Email));
            email.Subject = mailrequest.Subject;
            var builder = new BodyBuilder();
            builder.HtmlBody = mailrequest.Emailbody;
            email.Body = builder.ToMessageBody();

            using var smptp = new SmtpClient();
            smptp.Connect(emailSettings.Host, emailSettings.Port, SecureSocketOptions.StartTls);
            smptp.Authenticate(emailSettings.Email, emailSettings.Password);
            await smptp.SendAsync(email);
            smptp.Disconnect(true);
        }
    }
}
