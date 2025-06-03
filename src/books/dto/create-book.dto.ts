import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsUrl,
  Min,
  Max,
  IsPositive,
} from "class-validator";

export class CreateBookDto {
  @ApiProperty({ example: "Qissa", description: "Kitobning sarlavhasi" })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: "978-3-16-148410-0",
    description: "Kitobning ISBN raqami",
  })
  @IsString()
  @IsNotEmpty()
  isbn: string;

  @ApiProperty({
    example: 1985,
    description: "Nashr etilgan yil",
  })
  @IsInt()
  @Min(1000)
  @Max(new Date().getFullYear())
  publication_year: number;

  @ApiProperty({
    example: 320,
    description: "Kitobning jami sahifalari soni",
  })
  @IsInt()
  @IsPositive()
  total_pages: number;

  @ApiProperty({
    example: "Ali Valiyev — mashhur o‘zbek yozuvchisi...",
    description: "Kitob haqida qisqacha ma’lumot",
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: "https://ali-valiyev.uz/cover.jpg",
    description: "Kitobning muqovasi rasmi URL manzili",
  })
  @IsUrl()
  cover_image: string;

  @ApiProperty({
    example: "Nashr etilgan",
    description: "Kitobning holati (statusi)",
  })
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiProperty({
    example: 45000,
    description: "Kitob narxi (so‘mda)",
  })
  @IsInt()
  @IsPositive()
  price: number;

  @ApiProperty({ example: 1, description: "Muallif ID raqami" })
  @IsInt()
  @IsPositive()
  author_id: number;

  @ApiProperty({ example: 2, description: "Nashriyot ID raqami" })
  @IsInt()
  @IsPositive()
  publisher_id: number;

  @ApiProperty({ example: 3, description: "Kategoriya ID raqami" })
  @IsInt()
  @IsPositive()
  category_id: number;

  @ApiProperty({ example: 4, description: "Til ID raqami" })
  @IsInt()
  @IsPositive()
  language_id: number;
}
