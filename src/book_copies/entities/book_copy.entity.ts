import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Book } from "../../books/entities/book.entity";
import { Branch } from "../../branch/entities/branch.entity";
import { Loan } from "../../loans/entities/loan.entity";

@Entity()
export class BookCopy {
  @ApiProperty({ example: 1, description: "Adminning ID raqami" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: "can_create,can_delete,can_update",
    description: "Admin ruxsatlari, vergul bilan ajratilgan",
  })
  @Column()
  condition: string;

  @ApiProperty()
  @Column()
  status: string;

  @ApiProperty({
    example: "2025-05-28T14:00:00.000Z",
    description: "Oxirgi tizimga kirish vaqti",
  })
  @Column({ type: "timestamp", default: () => "NOW()" })
  barcode: string;

  @ManyToOne(() => Book, (book) => book.bookCopies, { eager: true })
  @JoinColumn({ name: "book_id" })
  book: Book;

  @ManyToOne(() => Branch, (branch) => branch.bookCopies, { eager: true })
  @JoinColumn({ name: "branch_id" })
  branch: Branch;

  @OneToMany(() => Loan, (loan) => loan.bookCopy)
  loans: Loan[];
}
