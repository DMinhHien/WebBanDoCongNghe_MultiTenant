using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebBanDoCongNghe.DBContext;
using Newtonsoft.Json;
using WebBanDoCongNghe.Models;
using Newtonsoft.Json.Linq;
using Microsoft.AspNetCore.Http.HttpResults;
using System.Net.WebSockets;
using Microsoft.AspNetCore.Authorization;
namespace WebBanDoCongNghe.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductController : Controller
    {
        private readonly ProductDbContext _context;
       
        public ProductController(ProductDbContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpPost("create")]
        public ActionResult Create([FromBody] JObject json)
        {
            var model = JsonConvert.DeserializeObject<Product>(json.GetValue("data").ToString());
            model.id = Guid.NewGuid().ToString().Substring(0, 10);
            _context.Products.Add(model);
            _context.SaveChanges();
            return Json(model);
        }


        [Authorize]
        [HttpPost("edit")]
        public ActionResult Edit([FromBody] JObject json)
        {
            var model = JsonConvert.DeserializeObject<Product>(json.GetValue("data").ToString());
            _context.Products.Update(model);
            _context.SaveChanges();
            return Json(model);
        }

        [Authorize]
        [HttpPost("delete")]
        public ActionResult Delete([FromBody] JObject json)
        {
            var id = (json.GetValue("id").ToString());
            var result = _context.Products.SingleOrDefault(p => p.id == id);
            _context.Products.Remove(result);
            var receiptDetail=_context.ReceiptDetails.AsQueryable().Where(p => p.idProduct == id);
            if (receiptDetail != null)
            {
                foreach (var item in receiptDetail)
                {
                    int count = _context.ReceiptDetails.AsQueryable().Where(p => p.idReceipt == item.idReceipt).Count();
                    if (count == 1)
                    {
                        var receipt = _context.Receipts.FirstOrDefault(x => x.id == item.idReceipt);
                        _context.Receipts.Remove(receipt);
                    }
                    _context.ReceiptDetails.Remove(item);
                }
            }
            var cartDetail = _context.CartDetails.AsQueryable().Where(p => p.idProduct == id);
            if (cartDetail != null)
            {
                foreach (var item in cartDetail)
                {
                    _context.CartDetails.Remove(item);
                }
            }
            _context.SaveChanges();
            return Json(result);

        }
        [HttpGet("getListUse")]
        public IActionResult getListUse()
        {
            var result = _context.Products.AsQueryable().
                 Select(d => new
                 {
                     d.id,
                     d.productName,
                     d.unitPrice,
                     d.description,
                     d.quantity,
                     d.status,
                     d.image,
                     d.categoryId,
                     d.rating,
                     categoryName = _context.Categories
                        .Where(x => x.id == d.categoryId)
                        .Select(s => s.name) 
                        .FirstOrDefault()
                 }).ToList();
            return Json(result);
        }
        [HttpGet("getListUseCategory/{categoryId}")]
        public IActionResult getListUseCategory([FromRoute] string categoryId)
        {
            var result = _context.Products.AsQueryable().Where(x=>x.categoryId== categoryId).
                 Select(d => new
                 {
                     d.id,
                     d.productName,
                     d.unitPrice,
                     d.description,
                     d.quantity,
                     d.status,
                     d.image,
                     d.categoryId,
                     d.rating,
                     categoryName = _context.Categories
                        .Where(x => x.id == d.categoryId)
                        .Select(s => s.name)
                         .FirstOrDefault()
                 }).ToList();
            return Json(result);
        }
        [HttpGet("getListUseShop/{shopId}")]
        public IActionResult getListUseShop([FromRoute] string shopId)
        {
            var result = _context.Products.AsQueryable().Where(x => x.idShop == shopId).
                 Select(d => new
                 {
                     d.id,
                     d.productName,
                     d.unitPrice,
                     d.description,
                     d.quantity,
                     d.status,
                     d.image,
                     d.categoryId,
                     d.rating,
                     categoryName = _context.Categories
                        .Where(x => x.id == d.categoryId)
                        .Select(s => s.name)
                         .FirstOrDefault()
                 }).ToList();
            return Json(result);
        }
        [HttpGet("getListUseSearch")]
        public IActionResult getListUseSearch([FromBody] JObject json)
        {
            var searchString = json.GetValue("data").ToString();
            var result = _context.Products.AsQueryable().Where(x=>x.productName.Contains(searchString)).
                 Select(d => new
                 {
                     d.id,
                     d.productName,
                     d.unitPrice,
                     d.description,
                     d.quantity,
                     d.status,
                     d.image,
                     d.categoryId,
                     d.rating,
                     categoryName = _context.Categories
                        .Where(x => x.id == d.categoryId)
                        .Select(s => s.name)
                 }).ToList();
            return Json(result);
        }
        [HttpGet("getCount")]
        public IActionResult getCount() {
            int total=_context.Products.Count();
            return Json(total);
        }
        [HttpPost("getPageListUse")]
        public IActionResult getPageListUse([FromQuery] int pageNumber, [FromQuery] int pageSize)
        {
            var result = _context.Products.AsQueryable()
                .Skip((pageNumber - 1) * pageSize).Take(pageSize).
                 Select(d => new
                 {
                     d.id,
                     d.productName,
                     d.unitPrice,
                     d.description,
                     d.quantity,
                     d.status,
                     d.image,
                     d.categoryId,
                     d.rating,
                     categoryName = _context.Categories
                        .Where(x => x.id == d.categoryId)
                        .Select(s => s.name)
                 }).ToList();
            return Json(result);
        }
        [HttpGet("getElementById/{id}")]
        public IActionResult getElementById([FromRoute] string id)
        {
            var model = _context.Products
                .Where(m => m.id == id)
                .Select(d => new
                {
                    d.productName,
                    d.unitPrice,
                    d.description,
                    d.status,
                    d.image,
                    d.quantity,
                    d.categoryId,
                    d.rating,
                    // Chỉ lấy giá trị chuỗi của categoryName
                    categoryName = _context.Categories
                        .Where(x => x.id == d.categoryId)
                        .Select(s => s.name) // Lấy chuỗi s.name
                        .FirstOrDefault()
                })
                .FirstOrDefault(); // Thêm FirstOrDefault để lấy kết quả đầu tiên hoặc null

            if (model == null)
            {
                return NotFound();
            }
            return Json(model);
        }
    }
}
