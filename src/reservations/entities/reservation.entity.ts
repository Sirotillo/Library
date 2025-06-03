import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../../users/entities/user.entity";
import { Book } from "../../books/entities/book.entity";
import { Librarian } from "../../librarians/entities/librarian.entity";

@Entity()
export class Reservations {
  @ApiProperty({ example: 1, description: "A'zolik ID raqami" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: "Premium", description: "A'zolik turi" })
  @Column()
  reservations_date: Date;

  @ApiProperty({
    example: "2023-01-01",
    description: "A'zolik boshlanish sanasi",
  })
  @Column({ type: "date" })
  expiry_date: Date;

  @ApiProperty({ example: "2024-01-01", description: "A'zolik tugash sanasi" })
  @Column({ type: "varchar" })
  status: string;

  @ManyToOne(() => User, (user) => user.reservations)
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Book, (book) => book.reservations)
  @JoinColumn({ name: "book_id" })
  book: Book;

  @ManyToOne(() => Librarian, (librarian) => librarian.reservations)
  @JoinColumn({ name: "reserved_by" })
  reservedBy: Librarian;
}
