using Microsoft.EntityFrameworkCore.Migrations;

namespace DAL.Data.Migrations
{
    public partial class TaskGroupHierarchy : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TaskGroupHierarchy",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TaskGroupId = table.Column<long>(nullable: false),
                    RequiredId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaskGroupHierarchy", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TaskGroupHierarchy_TaskGroups_RequiredId",
                        column: x => x.RequiredId,
                        principalTable: "TaskGroups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TaskGroupHierarchy_TaskGroups_TaskGroupId",
                        column: x => x.TaskGroupId,
                        principalTable: "TaskGroups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TaskGroupHierarchy_RequiredId",
                table: "TaskGroupHierarchy",
                column: "RequiredId");

            migrationBuilder.CreateIndex(
                name: "IX_TaskGroupHierarchy_TaskGroupId",
                table: "TaskGroupHierarchy",
                column: "TaskGroupId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TaskGroupHierarchy");
        }
    }
}
