using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WebBanDoCongNghe.Interface;

namespace WebBanDoCongNghe.Models
{
    [Table("Shop")]
    public class Shop : ITenantEntity
    {
        [Key]
        public string id { get; set; }
        public string userId { get; set; }
        public string name { get; set; }
        public string address { get; set; }
        public double rating { get; set; }
        public string image { get; set; }
        public string TenantId { get; set; }
    }
}
