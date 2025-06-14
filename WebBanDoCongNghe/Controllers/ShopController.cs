﻿using WebBanDoCongNghe.DBContext;
using WebBanDoCongNghe.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Authorization;
using WebBanDoCongNghe.Service;
using WebBanDoCongNghe.Interface;
using Microsoft.EntityFrameworkCore;

namespace WebBanDoCongNghe.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ShopController : Controller
    {
        private readonly ProductDbContext _context;
        private readonly ITenantService tenantService;
        // GET: ProductController
        public ShopController(ProductDbContext context, ITenantService tenantService    )
        {
            _context = context;
            this.tenantService = tenantService;
        }

        // POST: ProductController/Create
        [Authorize]
        [HttpPost("create")]
        public ActionResult Create([FromBody] JObject json)
        {
            var model = JsonConvert.DeserializeObject<Shop>(json.GetValue("data").ToString());
            model.id = Guid.NewGuid().ToString().Substring(0, 10);
            model.rating = 0;
            var tenantId = tenantService.GetCurrentTenantId();
            model.TenantId = tenantId;
            _context.Shops.Add(model);
            _context.SaveChanges();
            return Json(model);
        }


        // POST: ShopController/Edit/5
        [Authorize]
        [HttpPost("edit")]
        public ActionResult Edit([FromBody] JObject json)
        {
            // Deserialize data into a temporary shop object
            var inputShop = JsonConvert.DeserializeObject<Shop>(json.GetValue("data").ToString());

            // Retrieve the existing shop from the database
            var shopToUpdate = _context.Shops.SingleOrDefault(s => s.id == inputShop.id);
            if (shopToUpdate == null)
            {
                return NotFound("Shop not found");
            }
            shopToUpdate.name = inputShop.name ?? shopToUpdate.name;
            shopToUpdate.address = inputShop.address ?? shopToUpdate.address;
            shopToUpdate.image = inputShop.image ?? shopToUpdate.image;
            shopToUpdate.rating = inputShop.rating; // if admin is allowed to update rating
            _context.SaveChanges();
            return Json(shopToUpdate);
        }
        [Authorize]
        [HttpPost("edit_admin")]
        public ActionResult AdminEdit([FromBody] JObject json)
        {
            // Deserialize data into a temporary shop object
            var inputShop = JsonConvert.DeserializeObject<Shop>(json.GetValue("data").ToString());

            // Retrieve the existing shop from the database
            var shopToUpdate = _context.Shops.IgnoreQueryFilters().SingleOrDefault(s => s.id == inputShop.id);
            if (shopToUpdate == null)
            {
                return NotFound("Shop not found");
            }
            shopToUpdate.name = inputShop.name ?? shopToUpdate.name;
            shopToUpdate.address = inputShop.address ?? shopToUpdate.address;
            shopToUpdate.image = inputShop.image ?? shopToUpdate.image;
            shopToUpdate.rating = inputShop.rating; // if admin is allowed to update rating
            _context.SaveChanges();
            return Json(shopToUpdate);
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
            var result = _context.Shops.IgnoreQueryFilters().AsQueryable().
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
            var model = _context.Shops.IgnoreQueryFilters().SingleOrDefault(x=>x.id == id);
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
