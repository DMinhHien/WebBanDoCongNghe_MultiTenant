using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
namespace WebBanDoCongNghe.Models
{
    [Table("Category")]
    public class Category
    {
        [Key]
        public string id { get; set; }
        public string name { get; set; }
    }
}
