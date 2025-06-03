import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsNumber,
  IsEmail,
  Min,
  Matches,
} from "class-validator";

export class CreateLibrarianDto {
  @ApiProperty({
    example: "bolalar, ilmiy",
    description:
      "Kutubxonachining ishlaydigan bo‘limlari, vergul bilan ajratilgan",
  })
  @IsString()
  @IsNotEmpty()
  department: string;

  @ApiProperty({
    example: "2023-09-01",
    description: "Ishga olingan sana",
  })
  @IsDateString()
  hire_date: Date;

  @ApiProperty({
    example: 3500000,
    description: "Kutubxonachining oylik maoshi (so‘mda)",
  })
  @IsNumber()
  @Min(0)
  salary: number;

  @ApiProperty({
    example: "1-son kutubxona filiali",
    description: "Ishlayotgan kutubxona filiali",
  })
  @IsNumber()
  libraryBranchId: number;

  @ApiProperty({
    example: "Ali",
    description: "Kutubxonachining ismi",
  })
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({
    example: "Valiyev",
    description: "Kutubxonachining familiyasi",
  })
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({
    example: "ali@example.com",
    description: "Kutubxonachining email manzili",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: "12345678",
    description: "Kutubxonachining paroli",
  })
  @IsString()
  @Matches(/^.{6,}$/, {
    message: "Parol kamida 6 ta belgidan iborat bo'lishi kerak",
  })
  password: string;
}
