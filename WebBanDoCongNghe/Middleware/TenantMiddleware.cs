using WebBanDoCongNghe.DBContext;
using WebBanDoCongNghe.Interface;

namespace WebBanDoCongNghe.Middleware
{
    public class TenantMiddleware
    {
        private readonly RequestDelegate _next;

        public TenantMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context, ProductDbContext dbContext, ITenantService tenantService)
        {
            try
            {
                var tenantId = tenantService.GetCurrentTenantId();

                if (!string.IsNullOrEmpty(tenantId))
                {
                    dbContext.TenantId = tenantId;
                }
                else
                {
                    // Handle missing tenant ID - perhaps log a warning or use default
                    dbContext.TenantId = "default-tenant-id";
                }

                await _next(context);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Tenant middleware error: {ex.Message}\n{ex.StackTrace}");
                if (ex.InnerException != null)
                {
                    Console.WriteLine($"Inner exception: {ex.InnerException.Message}");
                }
                context.Response.StatusCode = 500;
                await context.Response.WriteAsync("An error occurred processing the tenant context.");
            }
        }
    }
}
