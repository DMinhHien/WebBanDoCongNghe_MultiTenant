using WebBanDoCongNghe.DBContext;
using WebBanDoCongNghe.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace WebBanDoCongNghe.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ReceiptController : Controller
    {
        private readonly ProductDbContext _context;
        // GET: ProductController
        public ReceiptController(ProductDbContext context)
        {
            _context = context;
        }

        // POST: ProductController/Create
        [Authorize]
        [HttpPost("create/{userId}")]
        public ActionResult Create([FromBody] JObject json, [FromRoute] string userId)
        {
            var receipt = new Receipt();
            var receiptDetailsJson = json.GetValue("data");
            var receiptDetails = JsonConvert.DeserializeObject<List<ReceiptDetail>>(receiptDetailsJson.ToString());
            receipt.id = Guid.NewGuid().ToString().Substring(0, 10);
            receipt.userId = userId;
            receipt.date = DateTime.Now;
            _context.Receipts.Add(receipt);
            foreach (var detail in receiptDetails)
            {
                var product = _context.Products.FirstOrDefault(x => x.id == detail.idProduct);
                product.quantity = product.quantity - detail.quantity;
                detail.id = Guid.NewGuid().ToString(); 
                detail.idReceipt = receipt.id;
                _context.Products.Update(product);
                _context.ReceiptDetails.Add(detail);
            }
            _context.SaveChanges();
            return Json(receipt);
        }


        // POST: ReceiptController/Edit/5
        [Authorize]
        [HttpPost("edit")]
        public ActionResult Edit([FromBody] JObject json)
        {
            var model = JsonConvert.DeserializeObject<Receipt>(json.GetValue("data").ToString());
            _context.Receipts.Update(model);
            _context.SaveChanges();
            return Json(model);
        }

        // POST: ReceiptController/Delete/5
        [Authorize]
        [HttpPost("delete")]
        public ActionResult Delete([FromBody] JObject json)
        {
            var id = (json.GetValue("id").ToString());
            var result = _context.Receipts.SingleOrDefault(p => p.id == id);
            var detailList=_context.ReceiptDetails.Where(x=>x.idReceipt==id).ToList();
            if (detailList != null)
            {
                foreach (var detail in detailList)
                {
                    _context.ReceiptDetails.Remove(detail);  
                }
            }
            _context.Receipts.Remove(result);
            _context.SaveChanges();
            return Json(result);

        }
        [HttpGet("getSumProduct")]
        public IActionResult getSumProduct([FromBody] JObject json) 
        {
            var shopId = json.GetValue("id").ToString();
            var result = _context.ReceiptDetails.AsQueryable().Where(x => x.id == shopId).ToList();
            int sum = 0;
            foreach(var item in result)
            {
                sum += item.quantity;
            }
            return Json(sum);
        }
        [HttpGet("getReceiptDetail/{receiptId}")]
        public IActionResult getReceiptDetail([FromRoute] string receiptId)
        {
            var result=_context.ReceiptDetails.Where(x=>x.idReceipt==receiptId)
                .Select(rd=>new
                {
                    rd.id,
                    rd.idProduct,
                    rd.quantity,
                    Image = _context.Products.Where(p => p.id == rd.idProduct)
                            .Select(p => p.image).FirstOrDefault(),
                    UnitPrice = _context.Products.Where(p => p.id == rd.idProduct)
                            .Select(p => p.unitPrice).FirstOrDefault(),
                    ProductName = _context.Products.Where(p => p.id == rd.idProduct)
                            .Select(p => p.productName).FirstOrDefault()
                }).ToList();
            return Json(result);
        }
        [HttpGet("getListUse/{userId}")]
        public IActionResult getListUse([FromRoute] string userId)
        {
            var result = _context.Receipts
                .Where(x => x.userId == userId)
                .Select(receipt => new
                {
                    receipt.id,
                    receipt.date,
                    TotalAmount = _context.ReceiptDetails
                .Where(rd => rd.idReceipt == receipt.id)
                .Join(
                    _context.Products,
                    rd => rd.idProduct,
                    p => p.id,
                    (rd, p) => new { rd.quantity, p.unitPrice } // Gộp quantity và unitPrice
                )
                .Sum(item => item.quantity * item.unitPrice),
                    ShopName = _context.ReceiptDetails
                        .Where(rd => rd.idReceipt == receipt.id)
                        .OrderBy(rd => rd.id) // Lấy ReceiptDetail đầu tiên
                        .Select(rd => _context.Products
                            .Where(p => p.id == rd.idProduct)
                            .Select(p => _context.Shops
                                .Where(s => s.id == p.idShop) // Truy vấn Shop dựa trên idShop
                                .Select(s => s.name)
                                .FirstOrDefault())
                            .FirstOrDefault())
                        .FirstOrDefault() // ShopName của ReceiptDetail đầu tiên
                })
                .ToList();

            return Json(result);
        }

        [HttpGet("getListUseUser/{userId}")]
        public IActionResult getListUseUser([FromRoute] string userId)
        {
            var result = _context.ReceiptDetails
                .Where(rd => _context.Receipts
                    .Any(r => r.userId == userId && r.id == rd.idReceipt)) // Lọc ReceiptDetail theo idReceipt
                .Select(rd => new
                {
                    rd.id,
                    rd.idReceipt,
                    rd.idProduct,
                    rd.quantity,
                    Product = _context.Products
                        .Where(p => p.id == rd.idProduct)
                        .Select(p => new
                        {
                            p.id,
                            p.productName,
                            p.unitPrice
                        }).FirstOrDefault()
                }).ToList();

            return Json(result);
        }

        [HttpGet("getListUseShop/{shopId}")]
        public IActionResult getListUseShop([FromRoute] string shopId)
        {

            // Truy vấn các ReceiptDetail cho các sản phẩm thuộc shopId
            var result = _context.ReceiptDetails
                .Where(rd => _context.Products
                    .Any(p => p.id == rd.idProduct && p.idShop == shopId)) // Chỉ lấy ReceiptDetail có Product thuộc shopId
                .Select(receiptDetail => new
                {
                    receiptDetail.idProduct,
                    receiptDetail.quantity,
                    receiptDetail.idReceipt,
                    // Lấy thông tin Receipt liên quan
                    Receipt = _context.Receipts
                        .Where(r => r.id == receiptDetail.idReceipt)
                        .Select(r => new
                        {
                            r.userId,
                            r.date,
                            AccountName=_context.Users.Where(x=>x.Id==r.userId).Select(x=>x.AccountName).FirstOrDefault(),
                        }).FirstOrDefault(),
                    // Lấy thông tin Product
                    Product = _context.Products
                        .Where(p => p.id == receiptDetail.idProduct && p.idShop == shopId)
                        .Select(p => new
                        {
                            p.id,
                            p.productName,
                            p.unitPrice,
                            TotalPrice = receiptDetail.quantity*p.unitPrice
                        }).FirstOrDefault()
                }).ToList();

            return Json(result);
        }
    }
}
