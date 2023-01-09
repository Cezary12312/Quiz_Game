using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using QuizAPI.Models;

namespace QuizAPI.Data.Context
{
    public class QuizDbContext : IdentityDbContext
    {
        public QuizDbContext(DbContextOptions<QuizDbContext> options) : base(options) { }
        public DbSet<QuizQuestion> QuizQuestions { get; set; }
        public DbSet<Participant> Participants { get; set; }
    }
}