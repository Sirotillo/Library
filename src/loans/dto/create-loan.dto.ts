import { ApiProperty } from "@nestjs/swagger";
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { Type } from "class-transformer";

export class CreateLoanDto {
  @ApiProperty({
    example: "2025-05-31T12:00:00Z",
    description: "Qarz berilgan sana",
  })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  loan_date: Date;

  @ApiProperty({
    example: "2025-06-15T12:00:00Z",
    description: "Qarz qaytarilishi kerak bo‘lgan sana",
  })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  due_date: Date;

  @ApiProperty({
    example: "2025-06-20T12:00:00Z",
    description: "Qarz qaytarilgan sana (agar mavjud bo‘lsa)",
    required: false,
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  return_date?: Date;

  @ApiProperty({ example: 5000, description: "Kechikish jarimasi (so'mda)" })
  @IsNotEmpty()
  @IsNumber()
  late_fee: number;

  @ApiProperty({
    example: "Qarz o‘z vaqtida qaytarilmadi.",
    description: "Qo‘shimcha izohlar",
    required: false,
  })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({ example: 7, description: "Foydalanuvchi ID raqami" })
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @ApiProperty({ example: 15, description: "Kitob nusxasi ID raqami" })
  @IsNotEmpty()
  @IsNumber()
  copy_id: number;

  @ApiProperty({
    example: 3,
    description: "Qarz bergan kutubxonachi ID raqami",
  })
  @IsNotEmpty()
  @IsNumber()
  issued_by: number;
}
