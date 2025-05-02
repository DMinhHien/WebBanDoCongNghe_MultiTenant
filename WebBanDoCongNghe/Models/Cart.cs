using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WebBanDoCongNghe.Interface;

namespace WebBanDoCongNghe.Models
{
    [Table("Cart")]
    public class Cart : ITenantEntity
    {
        [Key]
        public string id { get; set; }
        public string userId { get; set; }
        public string TenantId { get; set; }
    }
}
