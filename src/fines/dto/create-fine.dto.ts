import { ApiProperty } from "@nestjs/swagger";
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsPositive,
} from "class-validator";

export class CreateFineDto {
  @ApiProperty({ example: 5000, description: "Jarima summasi (so'mda)" })
  @IsNumber()
  @IsPositive()
  amount: number;

  @ApiProperty({ example: "2023-01-01", description: "Jarima yozilgan sana" })
  @IsDateString()
  fine_date: Date;

  @ApiProperty({
    example: "to‘langan",
    description: "To‘lov holati (to‘langan yoki to‘lanmagan)",
  })
  @IsString()
  @IsNotEmpty()
  payment_status: string;

  @ApiProperty({
    example: "2023-01-05",
    description: "To‘lov sanasi (agar to‘langan bo‘lsa)",
  })
  @IsOptional()
  @IsDateString()
  payment_date?: Date;

  @ApiProperty({
    example: "Kitobni kech topshirgan",
    description: "Jarima sababi",
  })
  @IsString()
  @IsNotEmpty()
  reason: string;

  @ApiProperty({ example: 3, description: "Loan ID" })
  @IsNumber()
  loan_id: number;

  @ApiProperty({ example: 5, description: "Foydalanuvchi (user) ID raqami" })
  @IsNumber()
  user_id: number;

  @ApiProperty({
    example: 2,
    description: "Jarima yozgan kutubxonachi ID raqami",
  })
  @IsNumber()
  issued_by: number;
}
