using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using WebBanDoCongNghe.Interface;
namespace WebBanDoCongNghe.Models
{
    [Table("Category")]
    public class Category : ITenantEntity
    {
        [Key]
        public string id { get; set; }
        public string name { get; set; }
        public string TenantId { get; set; }
    }
}
