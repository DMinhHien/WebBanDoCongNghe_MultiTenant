using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
namespace WebBanDoCongNghe.Models
{
    [Table("CommentLike")]
    public class CommentLike
    {
        [Key]
        public string id { get; set; }
        public string userId { get; set; }
        public string idComment { get; set; }
        public string date { get; set; }
    }
}
