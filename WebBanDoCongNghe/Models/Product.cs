using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace WebBanDoCongNghe.Models
{
    [Table("Product")]
    public class Product
    {
        [Key]
        public string id { get; set; }
        public string productName {  get; set; }
        public string image {  get; set; }
        public double unitPrice { get; set; }
        public string categoryId { get; set; }
        public int quantity { get; set; }
        public string idShop { get; set; }
        public string status { get; set; }
        public string description { get; set; }
        public double rating { get; set; }
    }
}
