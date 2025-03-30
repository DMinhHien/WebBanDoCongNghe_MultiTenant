using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
namespace WebBanDoCongNghe.Models
{
    [Table("Comment")]
    public class Comment
    {
        [Key]
        public string id { get; set; }
        public string userId { get; set; }
        public string content { get; set; }
        public string productId { get; set; }
        public double rating { get; set; }
        public DateTime date { get; set; }
    }
}
