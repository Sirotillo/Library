import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsInt, IsUrl, Matches } from "class-validator";

export class CreatePublisherDto {
  @ApiProperty({
    example: "O‘zbekiston Nashriyoti",
    description: "Nashriyot nomi",
  })
  @IsString()
  @IsNotEmpty()
  publisher_name: string;

  @ApiProperty({
    example: "O‘zbekiston",
    description: "Nashriyot joylashgan mamlakat",
  })
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty({
    example: 1985,
    description: "Nashriyot tashkil etilgan yil",
  })
  @IsInt()
  founded_year: number;

  @ApiProperty({
    example: "https://uzpublisher.uz",
    description: "Nashriyotning rasmiy veb-sayti",
  })
  @IsUrl()
  website: string;

  @ApiProperty({
    example: "+998901234567",
    description: "Nashriyotning aloqa raqami",
  })
  @IsString()
  @Matches(/^\+998\d{9}$/, {
    message: "Telefon raqam formati: +998XXXXXXXXX",
  })
  contact: string;

  @ApiProperty({
    example: "Toshkent sh., Mustaqillik ko'chasi 12",
    description: "Nashriyot manzili",
  })
  @IsString()
  @IsNotEmpty()
  address: string;
}
