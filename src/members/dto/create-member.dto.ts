import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsInt, IsPositive, IsDateString } from "class-validator";

export class CreateMemberDto {
  @ApiProperty({ example: "Premium", description: "A'zolik turi" })
  @IsString()
  membership_type: string;

  @ApiProperty({
    example: "2023-01-01",
    description: "A'zolik boshlanish sanasi",
  })
  @IsDateString()
  membership_date: Date;

  @ApiProperty({ example: "2024-01-01", description: "A'zolik tugash sanasi" })
  @IsDateString()
  membership_expiry_date: Date;

  @ApiProperty({
    example: 5,
    description: "Maksimal qarzga olingan kitoblar soni",
  })
  @IsInt()
  @IsPositive()
  max_loan_limit: number;

  @ApiProperty({ example: "Fantastika", description: "Sevimli janr" })
  @IsString()
  favourite_genre: string;

  @ApiProperty({ example: 1, description: "Foydalanuvchi ID-si" })
  @IsInt()
  @IsPositive()
  user_id: number;
}
