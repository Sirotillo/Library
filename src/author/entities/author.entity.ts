import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Book } from "../../books/entities/book.entity";

@Entity()
export class Author {
  @ApiProperty({ example: 1, description: "Muallifning ID raqami" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: "Ali", description: "Muallifning ismi" })
  @Column()
  first_name: string;

  @ApiProperty({ example: "Valiyev", description: "Muallifning familiyasi" })
  @Column()
  last_name: string;

  @ApiProperty({
    example: 1985,
    description: "Muallif tug‘ilgan yili",
  })
  @Column()
  birth_year: number;

  @ApiProperty({
    example: "O'zbek",
    description: "Muallif millati",
  })
  @Column()
  nationality: string;

  @ApiProperty({
    example: "Ali Valiyev — mashhur o‘zbek yozuvchisi...",
    description: "Muallif haqida qisqacha ma’lumot",
  })
  @Column()
  biography: string;

  @ApiProperty({
    example: "https://ali-valiyev.uz",
    description: "Muallifning shaxsiy veb-sayti",
  })
  @Column()
  website: string;

  @ApiProperty({
    example: "Mukofot: Yilning eng yaxshi yozuvchisi (2015)",
    description: "Muallif olgan mukofotlar",
  })
  @Column()
  awards: string;

  @OneToMany(() => Book, (book) => book.author)
  books: Book[];
}
