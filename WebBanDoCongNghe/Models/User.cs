using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;
namespace WebBanDoCongNghe.Models
{
    public class UserManage : IdentityUser
    {
        public DateTime? birthDate { get; set; }
        public string? Address { get; set; }
        public string AccountName { get; set; }
    }
}
