import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Librarian } from "../../librarians/entities/librarian.entity";
import { BookCopy } from "../../book_copies/entities/book_copy.entity";

@Entity()
export class Branch {
  @ApiProperty({ example: 1, description: "Filialning ID raqami" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: "1-son kutubxona filiali",
    description: "Filial nomi",
  })
  @Column()
  branch_name: string;

  @ApiProperty({
    example: "Toshkent shahar, Mustaqillik ko'chasi 12",
    description: "Filial manzili",
  })
  @Column()
  address: string;

  @ApiProperty({
    example: "+998901234567",
    description: "Filial telefon raqami",
  })
  @Column()
  phone: string;

  @ApiProperty({
    example: "branch@example.com",
    description: "Filial email manzili",
  })
  @Column()
  email: string;

  @OneToMany(() => Librarian, (librarians) => librarians.library_branch)
  librarians: Librarian[];

  @OneToMany(() => BookCopy, (bookCopy) => bookCopy.branch)
  bookCopies: BookCopy[];
}
