using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WebBanDoCongNghe.Interface;

namespace WebBanDoCongNghe.Models
{
    [Table("CartDetail")]
    public class CartDetail : ITenantEntity
    {
        [Key]
        public string id { get; set; }
        public string idCart {  get; set; }
        public string idProduct { get; set; }
        public int quantity { get; set; }
        public string TenantId { get; set; }
    }
}
