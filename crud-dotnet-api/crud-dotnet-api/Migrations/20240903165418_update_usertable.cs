using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace crud_dotnet_api.Migrations
{
    /// <inheritdoc />
    public partial class update_usertable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Age",
                table: "Employees");

            migrationBuilder.RenameColumn(
                name: "Salary",
                table: "Employees",
                newName: "PlantId");

            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "Employees",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NIC",
                table: "Employees",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UserType",
                table: "Employees",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Address",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "NIC",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "UserType",
                table: "Employees");

            migrationBuilder.RenameColumn(
                name: "PlantId",
                table: "Employees",
                newName: "Salary");

            migrationBuilder.AddColumn<int>(
                name: "Age",
                table: "Employees",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
