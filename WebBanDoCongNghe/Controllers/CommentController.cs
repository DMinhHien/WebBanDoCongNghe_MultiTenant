using WebBanDoCongNghe.DBContext;
using WebBanDoCongNghe.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Authorization;
using WebBanDoCongNghe.Service;

namespace WebBanDoCongNghe.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CommentController : Controller
    {
        private readonly ProductDbContext _context;
        private readonly RatingService _ratingService;
        // GET: ProductController
        public CommentController(ProductDbContext context, RatingService ratingService)
        {
            _context = context;
            _ratingService = ratingService;
        }

        // POST: ProductController/Create
        [Authorize]
        [HttpPost("create")]
        public ActionResult Create([FromBody] JObject json)
        {
            var model = JsonConvert.DeserializeObject<Comment>(json.GetValue("data").ToString());
            model.id = Guid.NewGuid().ToString().Substring(0, 10);
            model.date= DateTime.Now;
            _context.Comments.Add(model);
            _context.SaveChanges();
            _ratingService.UpdateProductAndShopRating(model.productId);
            return Json(model);
        }

        // POST: CommentController/Edit/5
        [Authorize]
        [HttpPost("edit")]
        public ActionResult Edit([FromBody] JObject json)
        {
            var model = JsonConvert.DeserializeObject<Comment>(json.GetValue("data").ToString());
            _context.Comments.Update(model);
            _context.SaveChanges();
            _ratingService.UpdateProductAndShopRating(model.productId);
            return Json(model);
        }
        [HttpGet("getElementById/{id}")]
        public IActionResult getElementById([FromRoute] string id)
        {
            var model = _context.Comments.SingleOrDefault(x => x.id == id);
            return Json(model);
        }
        // POST: CommentController/Delete/5
        [Authorize]
        [HttpPost("delete")]
        public ActionResult Delete([FromBody] JObject json)
        {
            var id = (json.GetValue("id").ToString());
            var result = _context.Comments.SingleOrDefault(p => p.id == id);
            var like = _context.CommentLikes.AsQueryable().Where(p => p.idComment == id).ToList();
            if (like != null)
            {
                foreach(var item in like)
                {
                    _context.CommentLikes.Remove(item);
                }
            }
            _context.Comments.Remove(result);
            _context.SaveChanges();
            _ratingService.UpdateProductAndShopRating(result.productId);
            return Json(result);

        }
        [HttpGet("getListUse/{productId}")]
        public IActionResult getListUse([FromRoute] string productId)
        {
            var result = _context.Comments.AsQueryable().Where(x=>x.productId == productId).
                 Select(d => new
                 {
                     id = d.id,
                     content = d.content,
                     userId= d.userId,
                     username=_context.Users.Where(x=>x.Id==d.userId).Select(s=>s.AccountName).FirstOrDefault(),
                     date=d.date,
                     rating=d.rating,
                     likes=_context.CommentLikes.Where(x=>x.idComment==d.id).Count(),
                 }).ToList();
            return Json(result);
        }
        [Authorize]
        [HttpPost("likeComment")]
        public IActionResult likeComment([FromBody] JObject json)
        {
            var model = JsonConvert.DeserializeObject<CommentLike>(json.GetValue("data").ToString());
            _context.CommentLikes.Add(model);
            _context.SaveChanges();
            return Json(model);
        }
        [Authorize]
        [HttpPost("deleteLike/{id}")]
        public ActionResult deleteLike([FromBody] JObject json)
        {
            var id = (json.GetValue("id").ToString());
            var result = _context.CommentLikes.SingleOrDefault(p => p.id == id);
            _context.CommentLikes.Remove(result);
            _context.SaveChanges();
            return Json(result);

        }
    }
}
