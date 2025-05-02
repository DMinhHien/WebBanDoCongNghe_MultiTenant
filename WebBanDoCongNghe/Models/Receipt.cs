using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using WebBanDoCongNghe.Interface;
namespace WebBanDoCongNghe.Models
{
    [Table("Receipt")]
    public class Receipt : ITenantEntity
    {
        [Key]
        public string id { get; set; }
        public string userId { get; set; }
        public DateTime date { get; set; }
        public string TenantId { get; set; }
    }
}
