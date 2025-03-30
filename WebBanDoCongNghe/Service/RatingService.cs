using WebBanDoCongNghe.DBContext;

namespace WebBanDoCongNghe.Service
{
    public class RatingService
    {
        private readonly ProductDbContext _context;

        public RatingService(ProductDbContext context)
        {
            _context = context;
        }

        public void UpdateProductAndShopRating(string productId)
        {
            var product = _context.Products.AsQueryable().Where(x => x.id == productId).FirstOrDefault();
            var productComments = _context.Comments.Where(x => x.productId == product.id && x.rating!=0).ToList();
            double average = 0;

            foreach (var comment in productComments)
            {
                average += comment.rating;
            }
            average = productComments.Count() > 0 ? average / productComments.Count() : 0;
            product.rating = average;
            _context.Products.Update(product);

            // Update shop rating
            var shop = _context.Shops.AsQueryable().Where(x => x.id == product.idShop).FirstOrDefault();
            var shopProducts = _context.Products.AsQueryable().Where(x => x.idShop == shop.id && x.rating!=0).ToList();
            average = 0;

            foreach (var productItem in shopProducts)
            {
                average += productItem.rating;
            }
            average = shopProducts.Count() > 0 ? average / shopProducts.Count() : 0;
            shop.rating = average;
            _context.Shops.Update(shop);
            _context.SaveChanges();
        }
    }
}
