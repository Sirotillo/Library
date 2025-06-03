import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsBoolean } from "class-validator";

export class CreateLanguageDto {
  @ApiProperty({
    example: "O'zbek tili",
    description: "Til nomi",
  })
  @IsString()
  @IsNotEmpty()
  language_name: string;

  @ApiProperty({
    example: "uz",
    description: "Tilning qisqa kodi (ISO standarti bo‘yicha)",
  })
  @IsString()
  @IsNotEmpty()
  language_code: string;

  @ApiProperty({
    example: "O'zbek tilida yozilgan asarlar uchun",
    description: "Til haqida qisqacha ma’lumot",
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: true,
    description: "Til faol yoki yo‘qligini bildiradi",
  })
  @IsBoolean()
  is_active: boolean;
}
