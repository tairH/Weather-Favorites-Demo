using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WeatherFavorites.Infrastracture.Migrations
{
    public partial class AddStringKeyMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CityFavorite",
                columns: table => new
                {
                    CityKey = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    CityLocalizedName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CountryLocalizedName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CityFavorite", x => x.CityKey);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CityFavorite");
        }
    }
}
