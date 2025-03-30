using WebBanDoCongNghe.DBContext;
using WebBanDoCongNghe.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

namespace WebBanDoCongNghe.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SearchController : Controller
    {
        private readonly ProductDbContext _context;
        // GET: ProductController
        public SearchController(ProductDbContext context)
        {
            _context = context;
        }

        // POST: ProductController/Create
        [HttpPost("create")]
        public ActionResult Create([FromBody] JObject json)
        {
            var model = JsonConvert.DeserializeObject<Search>(json.GetValue("data").ToString());
            model.id = Guid.NewGuid().ToString().Substring(0, 10);
            _context.Searchs.Add(model);
            _context.SaveChanges();
            return Json(model);
        }


        // POST: SearchController/Edit/5
        [HttpPost("edit")]
        public ActionResult Edit([FromBody] JObject json)
        {
            var model = JsonConvert.DeserializeObject<Search>(json.GetValue("data").ToString());
            _context.Searchs.Update(model);
            _context.SaveChanges();
            return Json(model);
        }

        // POST: SearchController/Delete/5
        [HttpPost("delete")]
        public ActionResult Delete([FromBody] JObject json)
        {
            var id = (json.GetValue("id").ToString());
            var result = _context.Searchs.SingleOrDefault(p => p.id == id);
            _context.Searchs.Remove(result);
            _context.SaveChanges();
            return Json(result);

        }
        [HttpGet("getListUse/{userId}")]
        public IActionResult getListUse([FromRoute] string userId)
        {
            var result = _context.Searchs.AsQueryable().Where(x=>x.userId == userId).
                 Select(d => new
                 {
                     content = d.content
                 }).ToList();
            return Json(result);
        }
    }
}
