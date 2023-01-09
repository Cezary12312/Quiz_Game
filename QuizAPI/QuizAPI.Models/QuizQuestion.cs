using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuizAPI.Models
{
    public class QuizQuestion
    {
        [Key]
        public int Id { get; set; }
        [Column(TypeName = "nvarchar(250)")]
        public string Question { get; set; }
        [Column(TypeName = "nvarchar(50)")]
        public string? ImageName { get; set; }
        [Column(TypeName = "nvarchar(250)")]
        public string Answer1 { get; set; }
        [Column(TypeName = "nvarchar(250)")]
        public string Answer2 { get; set; }
        [Column(TypeName = "nvarchar(250)")]
        public string Answer3 { get; set; }
        [Column(TypeName = "nvarchar(250)")]
        public string Answer4 { get; set; }
        public int CorrectAnswer { get; set; }
    }
}
