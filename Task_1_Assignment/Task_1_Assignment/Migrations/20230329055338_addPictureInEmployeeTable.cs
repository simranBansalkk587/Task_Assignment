using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Task_1_Assignment.Migrations
{
    public partial class addPictureInEmployeeTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<byte[]>(
                name: "Picture",
                table: "Employees",
                type: "varbinary(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Picture",
                table: "Employees");
        }
    }
}
