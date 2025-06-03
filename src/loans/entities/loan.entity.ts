import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Book } from "../../books/entities/book.entity";
import { User } from "../../users/entities/user.entity";
import { BookCopy } from "../../book_copies/entities/book_copy.entity";
import { Librarian } from "../../librarians/entities/librarian.entity";
import { Fine } from "../../fines/entities/fine.entity";

@Entity()
export class Loan {
  @ApiProperty({ example: 1, description: "Muallifning ID raqami" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: "Ali", description: "Muallifning ismi" })
  @Column()
  loan_date: Date;

  @ApiProperty({ example: "Valiyev", description: "Muallifning familiyasi" })
  @Column()
  due_date: Date;

  @ApiProperty({
    example: 1985,
    description: "Muallif tug‘ilgan yili",
  })
  @Column()
  return_date: Date;

  @ApiProperty({
    example: "O'zbek",
    description: "Muallif millati",
  })
  @Column()
  late_fee: number;

  @ApiProperty({
    example: "Ali Valiyev — mashhur o‘zbek yozuvchisi...",
    description: "Muallif haqida qisqacha ma’lumot",
  })
  @Column()
  notes: string;

  @ManyToOne(() => User, (user) => user.loans)
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => BookCopy, (bookCopy) => bookCopy.loans)
  @JoinColumn({ name: "copy_id" })
  bookCopy: BookCopy;

  @ManyToOne(() => Librarian, (librarian) => librarian.loansIssued)
  @JoinColumn({ name: "issued_by" })
  issuedBy: Librarian;

  @OneToMany(() => Fine, (fine) => fine.loan)
  fines: Fine[];
}
