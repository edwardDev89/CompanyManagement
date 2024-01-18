using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace companyManagementAPI.Migrations
{
    /// <inheritdoc />
    public partial class _2ndMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Level",
                table: "Companies");

            migrationBuilder.DropColumn(
                name: "ParentCompany",
                table: "Companies");

            migrationBuilder.AddColumn<Guid>(
                name: "ParentCompanyId",
                table: "Companies",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Companies_ParentCompanyId",
                table: "Companies",
                column: "ParentCompanyId");

            migrationBuilder.AddForeignKey(
                name: "FK_Companies_Companies_ParentCompanyId",
                table: "Companies",
                column: "ParentCompanyId",
                principalTable: "Companies",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Companies_Companies_ParentCompanyId",
                table: "Companies");

            migrationBuilder.DropIndex(
                name: "IX_Companies_ParentCompanyId",
                table: "Companies");

            migrationBuilder.DropColumn(
                name: "ParentCompanyId",
                table: "Companies");

            migrationBuilder.AddColumn<int>(
                name: "Level",
                table: "Companies",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "ParentCompany",
                table: "Companies",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
