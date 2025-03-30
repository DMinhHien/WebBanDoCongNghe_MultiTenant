using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebBanDoCongNghe.DBContext;
using Newtonsoft.Json;
using WebBanDoCongNghe.Models;
using Newtonsoft.Json.Linq;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Authorization;
using System.Net.WebSockets;
using System.Security.Claims;
namespace WebBanDoCongNghe.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CartController : Controller
    {
        private readonly ProductDbContext _context;
       
        public CartController(ProductDbContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpPost("create")]
        public ActionResult Create([FromBody] JObject json)
        {
            var model = JsonConvert.DeserializeObject<Cart>(json.GetValue("data").ToString());
            model.id = Guid.NewGuid().ToString().Substring(0, 10);
            _context.Carts.Add(model);
            _context.SaveChanges();
            return Json(model);
        }

        [Authorize]
        [HttpPost("edit")]
        public ActionResult Edit([FromBody] JObject json)
        {
            var model = JsonConvert.DeserializeObject<Cart>(json.GetValue("data").ToString());
            _context.Carts.Update(model);
            _context.SaveChanges();
            return Json(model);
        }
        [Authorize]
        [HttpPost("editCartDetail")]
        public ActionResult EditCartDetail([FromBody] JObject json)
        {
            var model = JsonConvert.DeserializeObject<CartDetail>(json.GetValue("data").ToString());
            _context.CartDetails.Update(model);
            _context.SaveChanges();
            return Json(model);
        }
        [Authorize]
        [HttpPost("deleteCartDetail/{id}")]
        public ActionResult DeleteCartDetail([FromRoute] string id)
        {
            var result = _context.CartDetails.SingleOrDefault(p => p.id == id);
            _context.CartDetails.Remove(result);
            _context.SaveChanges();
            return Json(result);

        }
        [Authorize]
        [HttpPost("delete/{id}")]
        public ActionResult Delete([FromRoute] string id)
        {
            var result = _context.Carts.SingleOrDefault(p => p.id == id);
            _context.Carts.Remove(result);
            _context.SaveChanges();
            return Json(result);

        }
        [Authorize]
        [HttpGet("getListUse/{userId}")]
        public IActionResult getListUse([FromRoute] string userId)
        {
            var result = _context.Carts
                .Where(x => x.userId == userId)
                .Select(cart => new
                {
                    cart.id,
                    cart.userId,
                    Shops = _context.CartDetails
                        .Where(rd => rd.idCart == cart.id)
                        .GroupBy(rd => _context.Products
                                            .Where(p => p.id == rd.idProduct)
                                            .Select(p => p.idShop)
                                            .FirstOrDefault())
                        .Select(group => new
                        {
                            ShopId = group.Key,
                            ShopInfo = _context.Shops
                                .Where(s => s.id == group.Key)
                                .Select(s => new
                                {
                                    s.name,
                                    s.image
                                }).FirstOrDefault(),
                            Products = group.Select(rd => new
                            {
                                rd.id,
                                rd.idProduct,
                                rd.quantity,
                                ProductInfo = _context.Products
                                    .Where(p => p.id == rd.idProduct)
                                    .Select(p => new
                                    {
                                        p.productName,
                                        p.unitPrice,
                                        p.image,
                                        p.quantity
                                    }).FirstOrDefault()
                            }).ToList()
                        }).ToList()
                }).ToList();

            return Json(result);
        }
        [Authorize]
        [HttpPost("addCartProduct")]
        public IActionResult addCartProduct([FromBody] JObject json)
        {
            var model = JsonConvert.DeserializeObject<CartDetail>(json.GetValue("data").ToString());
            var cartId = model.idCart;
            var existsProduct=_context.CartDetails.Where(x=>x.idProduct==model.idProduct && x.idCart==cartId).FirstOrDefault();
            if (existsProduct != null)
            {
                var cartDetail = _context.CartDetails.Where(x => x.idProduct == model.idProduct).FirstOrDefault();
                cartDetail.quantity += 1;
                _context.CartDetails.Update(cartDetail);
            }
            else
            {
                model.id = Guid.NewGuid().ToString().Substring(0, 10);
                _context.CartDetails.Add(model);
            }
            _context.SaveChanges();
            return Json(model);
        }
        [HttpPost("getCartId/{userId}")]
        public IActionResult getCartId([FromRoute] string userId)
        {
            var result=_context.Carts.AsQueryable().Where(x=>x.userId == userId).Select(x=>x.id);
            return Json(result);
        }
        [HttpPost("getCartTotalId/{userId}")]
        public IActionResult GetCartTotalId([FromRoute] string userId)
        {
            try
            {
                // Lấy danh sách id của Cart theo userId
                var cartIds = _context.Carts
                    .Where(x => x.userId == userId)
                    .Select(x => x.id)
                    .ToList();

                // Nếu không tìm thấy cart nào, trả về kết quả 0
                if (!cartIds.Any())
                {
                    return Json(0);
                }

                // Đếm tổng số CartDetails có idCart thuộc danh sách cartIds
                var result = _context.CartDetails
                    .Where(x => cartIds.Contains(x.idCart))
                    .Count();

                return Json(result);
            }
            catch (Exception ex)
            {
                // Xử lý lỗi nếu cần
                return BadRequest(new { message = "Error fetching cart details", error = ex.Message });
            }
        }
    }
}
