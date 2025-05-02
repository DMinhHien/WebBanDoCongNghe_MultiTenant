using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using WebBanDoCongNghe.Interface;
namespace WebBanDoCongNghe.Models
{
    [Table("Search")]
    public class Search : ITenantEntity
    {
        [Key]
        public string id { get; set; }
        public string userId { get; set; }
        public string content { get; set; }
        public string TenantId { get; set; }
    }
}
