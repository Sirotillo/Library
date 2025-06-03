import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Book } from "../../books/entities/book.entity";

@Entity()
export class Languages {
  @ApiProperty({ example: 1, description: "Til ID raqami" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: "O'zbek tili", description: "Til nomi" })
  @Column()
  language_name: string;

  @ApiProperty({
    example: "uz",
    description: "Tilning qisqa kodi (ISO standarti bo‘yicha)",
  })
  @Column()
  language_code: string;

  @ApiProperty({
    example: "O'zbek tilida yozilgan asarlar uchun",
    description: "Til haqida qisqacha ma’lumot",
  })
  @Column()
  description: string;

  @ApiProperty({
    example: true,
    description: "Til faol yoki yo‘qligini bildiradi",
  })
  @Column({ default: true })
  is_active: boolean;

  @OneToMany(() => Book, (book) => book.language)
  books: Book[];
}
