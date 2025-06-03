import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { v4 as uuidv4 } from "uuid";
import { Member } from "../../members/entities/member.entity";
import { Loan } from "../../loans/entities/loan.entity";
import { Reservations } from "../../reservations/entities/reservation.entity";
import { Fine } from "../../fines/entities/fine.entity";

export enum UserGender {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
}

@Entity()
export class User {
  @ApiProperty({ example: 1, description: "Userning ID raqami" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: "Ali", description: "Userning ismi" })
  @Column()
  first_name: string;

  @ApiProperty({ example: "Valiyev", description: "Userning familiyasi" })
  @Column()
  last_name: string;

  @ApiProperty({
    example: "ali@example.com",
    description: "User email manzili",
  })
  @Column()
  email: string;

  @ApiProperty({
    example: "+998901234567",
    description: "User telefon raqami",
  })
  @Column()
  phone: string;

  @ApiProperty({ example: "Toshkent", description: "User manzili" })
  @Column()
  address: string;

  @ApiProperty({
    example: false,
    description: "User faol yoki yo‘qligi",
  })
  @Column({ default: false })
  is_active: boolean;

  @ApiProperty({
    enum: UserGender,
    example: UserGender.MALE,
    description: "User jinsi",
  })
  @Column({ type: "enum", enum: UserGender })
  gender: UserGender;

  @ApiProperty({
    example: "1990-01-01",
    description: "User tug‘ilgan sanasi",
  })
  @Column()
  birth_date: Date;

  @ApiProperty({
    example: "https://example.com/image.jpg",
    description: "User profil rasmi",
  })
  @Column({ nullable: true })
  profile_picture: string;

  @ApiProperty({
    example: "hashedPassword",
    description: "User paroli (hashed)",
  })
  @Column()
  password: string;

  @ApiProperty({
    example: "someRefreshTokenHash",
    description: "Refresh token (hashed)",
  })
  @Column({ nullable: true })
  refresh_token: string;

  @ApiProperty({
    example: "someActivateLink",
    description: "Activate link",
  })
  @Column({
    type: "uuid",
    default: () => `'${uuidv4()}'`,
  })
  activate_link: string;

  @OneToMany(() => Member, (member) => member.user)
  members: Member[];

  @OneToMany(() => Loan, (loan) => loan.user)
  loans: Loan[];

  @OneToMany(() => Reservations, (reservation) => reservation.user)
  reservations: Reservations[];

  @OneToMany(() => Fine, (fine) => fine.user)
  fines: Fine[];
}
