
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class StoreContext: DbContext
    {
        public StoreContext(DbContextOptions options) : base(options)
        {
            
        }
        public virtual DbSet<Product> Products { get; set; }
        public virtual DbSet<Basket> Baskets{ get; set; }
    }
}