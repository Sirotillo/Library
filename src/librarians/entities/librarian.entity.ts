import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Branch } from "../../branch/entities/branch.entity";
import { Loan } from "../../loans/entities/loan.entity";
import { Reservations } from "../../reservations/entities/reservation.entity";
import { Fine } from "../../fines/entities/fine.entity";

@Entity()
export class Librarian {
  @ApiProperty({ example: 1, description: "Kutubxonachining ID raqami" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: "bolalar, ilmiy, umumiy",
    description:
      "Kutubxonachining ishlaydigan bo‘limlari, vergul bilan ajratilgan",
  })
  @Column()
  department: string;

  @ApiProperty({
    example: "2023-09-01",
    description: "Ishga olingan sana",
  })
  @Column()
  hire_date: Date;

  @ApiProperty({
    example: 3500000,
    description: "Kutubxonachining oylik maoshi (so‘mda)",
  })
  @Column()
  salary: number;

  @ApiProperty({
    example: "1-son kutubxona filiali",
    description: "Ishlayotgan kutubxona filiali",
  })
  @ManyToOne(() => Branch, (branch) => branch.librarians, { nullable: true })
  library_branch: Branch;

  @ApiProperty({ example: "Ali", description: "Kutubxonachining ismi" })
  @Column()
  first_name: string;

  @ApiProperty({
    example: "Valiyev",
    description: "Kutubxonachining familiyasi",
  })
  @Column()
  last_name: string;

  @ApiProperty({
    example: "ali@example.com",
    description: "Kutubxonachining email manzili",
  })
  @Column()
  email: string;

  @ApiProperty({ example: "12345678", description: "Kutubxonachining paroli" })
  @Column()
  password: string;

  @ApiProperty({
    example: "someRefreshTokenHash",
    description: "Refresh token (hashed)",
  })
  @Column({ nullable: true })
  refresh_token: string;

  @OneToMany(() => Loan, (loan) => loan.issuedBy)
  loansIssued: Loan[];

  @OneToMany(() => Reservations, (reservation) => reservation.reservedBy)
  reservations: Reservations[];

  @OneToMany(() => Fine, (fine) => fine.issuedBy)
  issuedFines: Fine[];
}
