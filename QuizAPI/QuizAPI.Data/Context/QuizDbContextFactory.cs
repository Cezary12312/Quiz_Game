using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore;

namespace QuizAPI.Data.Context
{
    public class QuizDbContextFactory
    {
        public class ApplicationDbContextFactory : IDesignTimeDbContextFactory<QuizDbContext>
        {
            public QuizDbContext CreateDbContext(string[] args)
            {
                var optionsBuilder = new DbContextOptionsBuilder<QuizDbContext>();
                optionsBuilder.UseSqlServer("Server=CEZARYPLYWACZ\\SQLSERVER;Database=QuizDb;Trusted_Connection=true;MultipleActiveResultSets=True;TrustServerCertificate=True");

                return new QuizDbContext(optionsBuilder.Options);
            }
        }
    }
}
