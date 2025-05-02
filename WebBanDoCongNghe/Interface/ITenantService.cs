namespace WebBanDoCongNghe.Interface
{
    public interface ITenantService
    {
        string GetCurrentTenantId();
        void SetCurrentTenant(string tenantId);
        void ApplyTenantFilter<T>(ref IQueryable<T> query) where T : class, ITenantEntity;
    }
}
