import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Type } from "class-transformer";

export class CreateReservationDto {
  @ApiProperty({
    example: "2025-05-31T12:00:00Z",
    description: "Reservatsiya qilingan sana",
  })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  reservations_date: Date;

  @ApiProperty({
    example: "2025-12-31",
    description:
      "Reservatsiya amal qilish muddati (yoki tugash sanasi, agar kerak bo'lsa)",
  })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  expiry_date: Date;

  @ApiProperty({
    example: "active",
    description: "Reservatsiya holati (masalan, active, cancelled, completed)",
  })
  @IsNotEmpty()
  @IsString()
  status: string;

  @ApiProperty({
    example: 7,
    description: "Foydalanuvchi (user) ID raqami",
  })
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @ApiProperty({
    example: 15,
    description: "Kitob (book) ID raqami",
  })
  @IsNotEmpty()
  @IsNumber()
  book_id: number;

  @ApiProperty({
    example: 3,
    description: "Reservatsiyani qilgan kutubxonachi (librarian) ID raqami",
  })
  @IsNotEmpty()
  @IsNumber()
  reserved_by: number;
}
