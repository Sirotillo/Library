import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Author } from "../../author/entities/author.entity";
import { Publisher } from "../../publisher/entities/publisher.entity";
import { Categories } from "../../categories/entities/category.entity";
import { Languages } from "../../languages/entities/language.entity";
import { BookCopy } from "../../book_copies/entities/book_copy.entity";
import { Reservations } from "../../reservations/entities/reservation.entity";

@Entity()
export class Book {
  @ApiProperty({ example: 1, description: "Kitobning ID raqami" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: "Algebra asoslari", description: "Kitobning nomi" })
  @Column()
  title: string;

  @ApiProperty({
    example: "978-3-16-148410-0",
    description: "Kitobning ISBN kodi",
  })
  @Column()
  isbn: string;

  @ApiProperty({
    example: 1985,
    description: "Kitob nashr etilgan yili",
  })
  @Column()
  publication_year: number;

  @ApiProperty({
    example: 350,
    description: "Kitobning sahifalar soni",
  })
  @Column()
  total_pages: number;

  @ApiProperty({
    example:
      "Algebra asoslari kitobi matematikaning asosiy tushunchalarini o'z ichiga oladi.",
    description: "Kitob haqida qisqacha ma'lumot",
  })
  @Column()
  description: string;

  @ApiProperty({
    example: "https://example.com/cover-image.jpg",
    description: "Kitob muqovasi rasmi URL manzili",
  })
  @Column()
  cover_image: string;

  @ApiProperty({
    example: "available",
    description: "Kitobning holati (mavjud/yangi/qo‘lda bor va h.k.)",
  })
  @Column()
  status: string;

  @ApiProperty({
    example: 45000,
    description: "Kitobning narxi (so‘mda)",
  })
  @Column()
  price: number;

  @ApiProperty({ example: "1", description: "Muallifning ID raqami" })
  @ManyToOne(() => Author, (author) => author.books)
  @JoinColumn({ name: "author_id" })
  author: Author;

  @ApiProperty({ example: "2", description: "Nashriyot ID raqami" })
  @ManyToOne(() => Publisher, (publisher) => publisher.books)
  @JoinColumn({ name: "publisher_id" })
  publisher: Publisher;

  @ApiProperty({ example: "3", description: "Kategoriya ID raqami" })
  @ManyToOne(() => Categories, (category) => category.books)
  @JoinColumn({ name: "category_id" })
  category: Categories;

  @ApiProperty({ example: "4", description: "Til ID raqami" })
  @ManyToOne(() => Languages, (language) => language.books)
  @JoinColumn({ name: "language_id" })
  language: Languages;

  @OneToMany(() => BookCopy, (bookCopy) => bookCopy.book)
  bookCopies: BookCopy[];

  @OneToMany(() => Reservations, (reservation) => reservation.book)
  reservations: Reservations[];
}
