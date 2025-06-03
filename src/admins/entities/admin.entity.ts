import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

export enum AdminLevel {
  ADMIN = "admin",
  SUPERADMIN = "superadmin",
}

@Entity()
export class Admin {
  @ApiProperty({ example: 1, description: "Adminning ID raqami" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: "can_create,can_delete,can_update",
    description: "Admin ruxsatlari, vergul bilan ajratilgan",
  })
  @Column()
  permissions: string;

  @ApiProperty({
    enum: AdminLevel,
    example: AdminLevel.ADMIN,
    description: "Admin darajasi",
  })
  @Column({
    type: "enum",
    enum: AdminLevel,
  })
  access_level: AdminLevel;

  @ApiProperty({
    example: "2025-05-28T14:00:00.000Z",
    description: "Oxirgi tizimga kirish vaqti",
  })
  @Column({ type: "timestamp", default: () => "NOW()" })
  last_login: Date;

  @ApiProperty({
    example: "Bu admin maxsus huquqlarga ega.",
    description: "Admin haqida izoh",
  })
  @Column()
  admin_notes: string;

  @ApiProperty({ example: "Ali", description: "Adminning ismi" })
  @Column()
  first_name: string;

  @ApiProperty({ example: "Valiyev", description: "Adminning familiyasi" })
  @Column()
  last_name: string;

  @ApiProperty({
    example: "ali@example.com",
    description: "Admin email manzili",
  })
  @Column()
  email: string;

  @ApiProperty({ example: "12345678", description: "Admin paroli" })
  @Column()
  password: string;

  @ApiProperty({
    example: "someRefreshTokenHash",
    description: "Refresh token (hashed)",
  })
  @Column({nullable: true})
  refresh_token: string;
}
