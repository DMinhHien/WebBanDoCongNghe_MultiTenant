using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebBanDoCongNghe.Models
{
    [Table("CartDetail")]
    public class CartDetail
    {
        [Key]
        public string id { get; set; }
        public string idCart {  get; set; }
        public string idProduct { get; set; }
        public int quantity { get; set; }
    }
}
