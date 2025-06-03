import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsInt, IsUrl } from "class-validator";

export class CreateAuthorDto {
  @ApiProperty({ example: "Ali", description: "Muallifning ismi" })
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({ example: "Valiyev", description: "Muallifning familiyasi" })
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({
    example: 1985,
    description: "Muallif tug‘ilgan yili",
  })
  @IsInt()
  birth_year: number;

  @ApiProperty({
    example: "O'zbek",
    description: "Muallif millati",
  })
  @IsString()
  @IsNotEmpty()
  nationality: string;

  @ApiProperty({
    example: "Ali Valiyev — mashhur o‘zbek yozuvchisi...",
    description: "Muallif haqida qisqacha ma’lumot",
  })
  @IsString()
  @IsNotEmpty()
  biography: string;

  @ApiProperty({
    example: "https://ali-valiyev.uz",
    description: "Muallifning shaxsiy veb-sayti",
  })
  @IsUrl()
  website: string;

  @ApiProperty({
    example: "Mukofot: Yilning eng yaxshi yozuvchisi (2015)",
    description: "Muallif olgan mukofotlar",
  })
  @IsString()
  @IsNotEmpty()
  awards: string;
}
