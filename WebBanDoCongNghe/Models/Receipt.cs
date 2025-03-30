using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
namespace WebBanDoCongNghe.Models
{
    [Table("Receipt")]
    public class Receipt
    {
        [Key]
        public string id { get; set; }
        public string userId { get; set; }
        public DateTime date { get; set; }
    }
}
