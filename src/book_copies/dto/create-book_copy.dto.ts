import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsNumber } from "class-validator";

export class CreateBookCopyDto {
  @ApiProperty({ example: "Yangi", description: "Kitobning holati" })
  @IsString()
  @IsNotEmpty()
  condition: string;

  @ApiProperty({ example: "Mavjud", description: "Kitobning statusi" })
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiProperty({
    example: "1234567890123",
    description: "Kitob nusxasining unikal shtrix-kodi (barcode)",
  })
  @IsString()
  @IsNotEmpty()
  barcode: string;

  @ApiProperty({
    example: 7,
    description: "Kitob ID (Book bilan bog‘liq)",
  })
  @IsNumber()
  book_id: number;

  @ApiProperty({
    example: 3,
    description: "Filial ID (Branch bilan bog‘liq)",
  })
  @IsNumber()
  branch_id: number;
}
