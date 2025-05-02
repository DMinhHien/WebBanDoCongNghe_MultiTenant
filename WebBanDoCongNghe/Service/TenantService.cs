using WebBanDoCongNghe.DBContext;
using WebBanDoCongNghe.Interface;
using WebBanDoCongNghe.Models;

namespace WebBanDoCongNghe.Service
{
    public class TenantService : ITenantService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly ProductDbContext _dbContext;
        private readonly IConfiguration _configuration;

        public TenantService(IHttpContextAccessor httpContextAccessor,
                            ProductDbContext dbContext,
                            IConfiguration configuration)
        {
            _httpContextAccessor = httpContextAccessor;
            _dbContext = dbContext;
            _configuration = configuration;
        }
        // Add to TenantService
        public string GenerateNewTenantId()
        {
            return Guid.NewGuid().ToString();
        }
        // Add to TenantService
        public bool ValidateTenantAccess(string entityTenantId)
        {
            var currentTenantId = GetCurrentTenantId();
            return !string.IsNullOrEmpty(currentTenantId) &&
                   !string.IsNullOrEmpty(entityTenantId) &&
                   currentTenantId == entityTenantId;
        }
        public string GetCurrentTenantId()
        {
            // First try to get from HTTP context
            var httpContext = _httpContextAccessor.HttpContext;
            if (httpContext != null)
            {
                var tenantId = httpContext.Request.Headers["TenantId"].FirstOrDefault();
                if (!string.IsNullOrEmpty(tenantId))
                {
                    return tenantId;
                }

                // Try to get from claims if authenticated
                if (httpContext.User?.Identity?.IsAuthenticated == true)
                {
                    tenantId = httpContext.User.Claims
                        .FirstOrDefault(c => c.Type == "TenantId")?.Value;

                    if (!string.IsNullOrEmpty(tenantId))
                    {
                        return tenantId;
                    }
                }
            }

            // If no tenant found, return default
            return _configuration["DefaultTenantId"];
        }

        public void SetCurrentTenant(string tenantId)
        {
            _dbContext.TenantId = tenantId;
        }

        public void ApplyTenantFilter<T>(ref IQueryable<T> query) where T : class, ITenantEntity
        {
            var tenantId = GetCurrentTenantId();
            if (!string.IsNullOrEmpty(tenantId))
            {
                query = query.Where(e => e.TenantId == tenantId);
            }
        }
    }
}
