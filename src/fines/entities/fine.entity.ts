import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../../users/entities/user.entity";
import { Librarian } from "../../librarians/entities/librarian.entity";
import { Loan } from "../../loans/entities/loan.entity";

@Entity("fines")
export class Fine {
  @ApiProperty({ example: 1, description: "Jarima ID raqami" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 5000, description: "Jarima summasi (so'mda)" })
  @Column()
  amount: number;

  @ApiProperty({ example: "2023-01-01", description: "Jarima yozilgan sana" })
  @Column({ type: "date" })
  fine_date: Date;

  @ApiProperty({ example: "to‘langan", description: "To‘lov holati" })
  @Column({ type: "varchar" })
  payment_status: string;

  @ApiProperty({ example: "2023-01-05", description: "To‘langan sana" })
  @Column({ type: "date", nullable: true })
  payment_date: Date;

  @ApiProperty({
    example: "Kitobni kech topshirgan",
    description: "Jarima sababi",
  })
  @Column({ type: "varchar" })
  reason: string;

  @ManyToOne(() => Loan, (loan) => loan.fines)
  @JoinColumn({ name: "loan_id" })
  loan: Loan;

  @ManyToOne(() => User, (user) => user.fines)
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Librarian, (librarian) => librarian.issuedFines)
  @JoinColumn({ name: "issued_by" })
  issuedBy: Librarian;
}
