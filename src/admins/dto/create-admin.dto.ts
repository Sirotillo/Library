import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsDateString,
  IsEmail,
  MinLength,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { AdminLevel } from "../entities/admin.entity";

export class CreateAdminDto {
  @ApiProperty({
    example: "can_create,can_delete,can_update",
    description: "Adminning ruxsatlari (vergul bilan ajratilgan)",
  })
  @IsString()
  @IsNotEmpty()
  permissions: string;

  @ApiProperty({
    enum: AdminLevel,
    example: AdminLevel.ADMIN,
    description: "Admin darajasi: admin | superadmin | moderator",
  })
  @IsEnum(AdminLevel, {
    message:
      "access_level faqat admin, superadmin yoki moderator bo'lishi kerak",
  })
  access_level: AdminLevel;

  @ApiProperty({
    example: "2025-05-28T14:00:00.000Z",
    description: "Oxirgi kirgan vaqt (ISO formatda)",
  })
  @IsDateString(
    {},
    { message: "last_login ISO formatdagi sana bo'lishi kerak" }
  )
  last_login: Date;

  @ApiProperty({
    example: "Bu admin maxsus huquqlarga ega.",
    description: "Admin haqida izoh",
  })
  @IsString()
  @IsNotEmpty()
  admin_notes: string;

  @ApiProperty({ example: "Ali", description: "Adminning ismi" })
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({ example: "Valiyev", description: "Adminning familiyasi" })
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({
    example: "ali@example.com",
    description: "Admin email manzili",
  })
  @IsEmail({}, { message: "email noto‘g‘ri formatda" })
  email: string;

  @ApiProperty({
    example: "12345678",
    description: "Parol kamida 6 ta belgidan iborat bo‘lishi kerak",
  })
  @IsString()
  @MinLength(6, { message: "Parol kamida 6 ta belgidan iborat bo‘lishi kerak" })
  password: string;
}
