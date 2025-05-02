using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using WebBanDoCongNghe.Interface;
namespace WebBanDoCongNghe.Models
{
    [Table("CommentLike")]
    public class CommentLike : ITenantEntity
    {
        [Key]
        public string id { get; set; }
        public string userId { get; set; }
        public string idComment { get; set; }
        public string date { get; set; }
        public string TenantId { get; set; }
    }
}
