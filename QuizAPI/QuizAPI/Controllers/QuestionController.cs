using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuizAPI.Data.Context;
using QuizAPI.Models;

namespace QuizAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionController : ControllerBase
    {
        private readonly QuizDbContext _context;

        public QuestionController(QuizDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<QuizQuestion>>> GetQuizQuestions()
        {
            if (_context.QuizQuestions == null)
            {
                return NotFound();
            }

            var rnd5Questions = await(_context.QuizQuestions.Select(x => new
            {
                Id = x.Id, 
                Question = x.Question,
                ImageName = x.ImageName,
                Options = new string[] {x.Answer1, x.Answer2, x.Answer3, x.Answer4}
            })
            .OrderBy(y => Guid.NewGuid())
            .Take(5)
            ).ToListAsync();

            return Ok(rnd5Questions);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<QuizQuestion>> GetQuizQuestion(int id)
        {
            var quizQuestion = await _context.QuizQuestions.FindAsync(id);

            if (quizQuestion == null)
            {
                return NotFound();
            }

            return quizQuestion;
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> PutQuizQuestion(int id, QuizQuestion quizQuestion)
        {
            if (id != quizQuestion.Id)
            {
                return BadRequest();
            }

            _context.Entry(quizQuestion).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QuizQuestionExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }
        [HttpPost]
        [Route("GetAnswers")]
        public async Task<ActionResult<QuizQuestion>> PostQuizQuestion(int[] questionIds)
        {
            var answers = await (_context.QuizQuestions.Where(x => questionIds.Contains(x.Id)).Select(y => new
            {
                Id = y.Id,
                Question = y.Question,
                ImageName = y.ImageName,
                Options = new string[] { y.Answer1, y.Answer2, y.Answer3, y.Answer4 },
                CorrectAnswer = y.CorrectAnswer
            })).ToListAsync();

            return Ok(answers);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuizQuestion(int id)
        {
            if (_context.QuizQuestions == null)
            {
                return NotFound();
            }
            var quizQuestion = await _context.QuizQuestions.FindAsync(id);
            if (quizQuestion == null)
            {
                return NotFound();
            }

            _context.QuizQuestions.Remove(quizQuestion);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool QuizQuestionExists(int id)
        {
            return (_context.QuizQuestions?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
