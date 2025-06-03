import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

export class CreateCategoryDto {
  @ApiProperty({
    example: "Fantastika",
    description: "Kategoriya nomi",
  })
  @IsString()
  @IsNotEmpty()
  category_name: string;

  @ApiProperty({
    example:
      "Ilmiy va g‘ayritabiiy voqealarni o‘z ichiga olgan asarlar toifasi",
    description: "Kategoriya haqida qisqacha ma’lumot",
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}
