using Microsoft.AspNetCore.Mvc;
using WebBanDoCongNghe.Interface;

namespace WebBanDoCongNghe.Controllers
{
    [ApiController]
    public abstract class TenantBaseController : ControllerBase
    {
        protected readonly ITenantService _tenantService;

        public TenantBaseController(ITenantService tenantService)
        {
            _tenantService = tenantService;
        }

        protected string GetCurrentTenantId()
        {
            return _tenantService.GetCurrentTenantId();
        }

        protected void EnsureTenantIdSet()
        {
            var tenantId = GetCurrentTenantId();
            _tenantService.SetCurrentTenant(tenantId);
        }
    }
}
