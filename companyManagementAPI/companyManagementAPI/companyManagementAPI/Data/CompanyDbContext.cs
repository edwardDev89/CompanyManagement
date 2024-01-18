using companyManagementAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace companyManagementAPI.Data
{
    public class CompanyDbContext : DbContext
    {
        public CompanyDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Company> Companies { get; set; }
    }
}
