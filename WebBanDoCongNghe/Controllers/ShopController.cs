using WebBanDoCongNghe.DBContext;
using WebBanDoCongNghe.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Authorization;

namespace WebBanDoCongNghe.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ShopController : Controller
    {
        private readonly ProductDbContext _context;
        // GET: ProductController
        public ShopController(ProductDbContext context)
        {
            _context = context;
        }

        // POST: ProductController/Create
        [Authorize]
        [HttpPost("create")]
        public ActionResult Create([FromBody] JObject json)
        {
            var model = JsonConvert.DeserializeObject<Shop>(json.GetValue("data").ToString());
            model.id = Guid.NewGuid().ToString().Substring(0, 10);
            model.rating = 0;
            _context.Shops.Add(model);
            _context.SaveChanges();
            return Json(model);
        }


        // POST: ShopController/Edit/5
        [Authorize]
        [HttpPost("edit")]
        public ActionResult Edit([FromBody] JObject json)
        {
            var model = JsonConvert.DeserializeObject<Shop>(json.GetValue("data").ToString());
            _context.Shops.Update(model);
            _context.SaveChanges();
            return Json(model);
        }

        // POST: ShopController/Delete/5
        [Authorize]
        [HttpPost("delete")]
        public ActionResult Delete([FromBody] JObject json)
        {
            var id = (json.GetValue("id").ToString());
            var result = _context.Shops.SingleOrDefault(p => p.id == id);
            _context.Shops.Remove(result);
            _context.SaveChanges();
            return Json(result);

        }
        [HttpGet("getShopId/{userId}")]
        public IActionResult getShopId([FromRoute] string userId)
        {
            var model = _context.Shops.SingleOrDefault(x => x.userId == userId);
            return Json(model.id);
        }
        [HttpGet("getListUse")]
        public IActionResult getListUse()
        {
            var result = _context.Shops.AsQueryable().
                 Select(d => new
                 {
                     d.id,
                     d.name,
                     UserName=_context.Users.Where(x=>x.Id==d.userId).Select(x=>x.UserName).FirstOrDefault(),
                     d.address,
                     d.image,
                     d.rating,
                 }).ToList();
            return Json(result);
        }
        [HttpGet("getElementById/{id}")]
        public IActionResult getElementById([FromRoute] string id)
        {
            var model = _context.Shops.SingleOrDefault(x=>x.id == id);
            return Json(model);
        }
        [HttpGet("getElementByUserId/{id}")]
        public IActionResult getElementByUserId([FromRoute] string id)
        {
            var model = _context.Shops.SingleOrDefault(x => x.userId == id);
            return Json(model);
        }
        [HttpGet("getListUseSearch")]
        public IActionResult getListUseSearch([FromBody] JObject json)
        {
            var searchString = json.GetValue("data").ToString();
            var result = _context.Shops.AsQueryable().Where(x => x.name.Contains(searchString)).
                 Select(d => new
                 {
                     d.id,
                     d.name,
                     d.address,
                     d.image,
                     d.rating
                 }).ToList();
            return Json(result);
        }
    }
}
