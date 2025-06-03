import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsOptional,
  IsEnum,
  IsDateString,
  Matches,
} from "class-validator";
import { UserGender } from "../entities/user.entity";

export class CreateUserDto {
  @ApiProperty({ example: "Ali", description: "Userning ismi" })
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({ example: "Valiyev", description: "Userning familiyasi" })
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({
    example: "ali@example.com",
    description: "User email manzili",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: "+998901234567",
    description: "User telefon raqami",
  })
  @IsString()
  @Matches(/^\+998\d{9}$/, {
    message: "Telefon raqam formati: +998XXXXXXXXX",
  })
  phone: string;

  @ApiProperty({ example: "Toshkent", description: "User manzili" })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    enum: UserGender,
    example: UserGender.MALE,
    description: "User jinsi",
  })
  @IsEnum(UserGender)
  gender: UserGender;

  @ApiProperty({
    example: "1990-01-01",
    description: "User tug‘ilgan sanasi",
  })
  @IsDateString()
  birth_date: Date;

  @ApiProperty({
    example: "https://example.com/image.jpg",
    description: "User profil rasmi",
  })
  @IsOptional()
  @IsString()
  profile_picture?: string;

  @ApiProperty({
    example: "hashedPassword",
    description: "User paroli",
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: "someRefreshTokenHash",
    description: "Refresh token (hashed)",
  })
  @IsOptional()
  @IsString()
  refresh_token?: string;
}
