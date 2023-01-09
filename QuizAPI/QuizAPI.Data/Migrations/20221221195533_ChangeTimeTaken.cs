using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace QuizAPI.Data.Migrations
{
    /// <inheritdoc />
    public partial class ChangeTimeTaken : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TimeTakien",
                table: "Participants",
                newName: "TimeTaken");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TimeTaken",
                table: "Participants",
                newName: "TimeTakien");
        }
    }
}
