using WebBanDoCongNghe.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Linq.Expressions;
using WebBanDoCongNghe.Interface;

namespace WebBanDoCongNghe.DBContext
{
    public class ProductDbContext : IdentityDbContext<UserManage>
    {
        public string TenantId { get; set; }
        public ProductDbContext(DbContextOptions<ProductDbContext> options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Apply global query filter for TenantId
            foreach (var entityType in modelBuilder.Model.GetEntityTypes())
            {
                if (typeof(ITenantEntity).IsAssignableFrom(entityType.ClrType))
                {
                    modelBuilder.Entity(entityType.ClrType).HasQueryFilter(
                        CreateTenantFilterExpression(entityType.ClrType));
                }
            }
        }

        private LambdaExpression CreateTenantFilterExpression(Type entityType)
        {
            var parameter = Expression.Parameter(entityType, "e");
            var property = Expression.Property(parameter, "TenantId");
            var tenantId = Expression.PropertyOrField(Expression.Constant(this), "TenantId");
            var body = Expression.Equal(property, tenantId);
            return Expression.Lambda(body, parameter);
        }

        // Add tenant ID to new entities before saving
        public override int SaveChanges()
        {
            SetTenantIdForNewEntities();
            return base.SaveChanges();
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            SetTenantIdForNewEntities();
            return base.SaveChangesAsync(cancellationToken);
        }

        private void SetTenantIdForNewEntities()
        {
            if (string.IsNullOrEmpty(TenantId))
                return;

            foreach (var entry in ChangeTracker.Entries())
            {
                if (entry.Entity is ITenantEntity entity && entry.State == EntityState.Added)
                {
                    if (string.IsNullOrEmpty(entity.TenantId))
                    {
                        entity.TenantId = TenantId;
                    }
                }
            }
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<UserManage> Users { get; set; }
        public DbSet<Receipt> Receipts { get; set; }
        public DbSet<ReceiptDetail> ReceiptDetails {  get; set; }
        public DbSet<Cart> Carts { get; set; }
        public DbSet<CartDetail> CartDetails { get; set; }
        public DbSet<Shop> Shops { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<CommentLike> CommentLikes { get; set; }
        public DbSet<Search> Searchs { get; set; }
        public DbSet<Category> Categories { get; set; }

    }
}
