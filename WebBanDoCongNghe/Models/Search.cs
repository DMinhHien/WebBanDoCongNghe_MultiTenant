using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
namespace WebBanDoCongNghe.Models
{
    [Table("Search")]
    public class Search
    {
        [Key]
        public string id { get; set; }
        public string userId { get; set; }
        public string content { get; set; }
    }
}
