import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Book } from "../../books/entities/book.entity";

@Entity()
export class Categories {
  @ApiProperty({ example: 1, description: "Kategoriya ID raqami" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: "Fantastika", description: "Kategoriya nomi" })
  @Column()
  category_name: string;

  @ApiProperty({
    example:
      "Ilmiy va g‘ayritabiiy voqealarni o‘z ichiga olgan asarlar toifasi",
    description: "Kategoriya haqida qisqacha ma’lumot",
  })
  @Column()
  description: string;

  @OneToMany(() => Book, (book) => book.category)
  books: Book[];
}
