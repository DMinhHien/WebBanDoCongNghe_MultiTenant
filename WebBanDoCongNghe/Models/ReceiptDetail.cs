using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using WebBanDoCongNghe.Interface;
namespace WebBanDoCongNghe.Models
{
    [Table("ReceiptDetail")]
    public class ReceiptDetail : ITenantEntity
    {
        [Key]
        public string id { get; set; }
        public string idReceipt { get; set; }
        public string idProduct { get; set; }
        public int quantity { get; set; }
        public string TenantId { get; set; }
    }
}
