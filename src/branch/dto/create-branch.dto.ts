import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsEmail } from "class-validator";

export class CreateBranchDto {
  @ApiProperty({
    example: "1-son kutubxona filiali",
    description: "Filial nomi",
  })
  @IsString()
  @IsNotEmpty()
  branch_name: string;

  @ApiProperty({
    example: "Toshkent shahar, Mustaqillik ko'chasi 12",
    description: "Filial manzili",
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    example: "+998901234567",
    description: "Filial telefon raqami",
  })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    example: "branch@example.com",
    description: "Filial email manzili",
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
