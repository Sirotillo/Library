import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Book } from "../../books/entities/book.entity";

@Entity()
export class Publisher {
  @ApiProperty({ example: 1, description: "Nashriyotning ID raqami" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: "O‘zbekiston Nashriyoti",
    description: "Nashriyot nomi",
  })
  @Column()
  publisher_name: string;

  @ApiProperty({
    example: "O‘zbekiston",
    description: "Nashriyot joylashgan mamlakat",
  })
  @Column()
  country: string;

  @ApiProperty({
    example: 1985,
    description: "Nashriyot tashkil etilgan yil",
  })
  @Column()
  founded_year: number;

  @ApiProperty({
    example: "https://uzpublisher.uz",
    description: "Nashriyotning rasmiy veb-sayti",
  })
  @Column()
  website: string;

  @ApiProperty({
    example: "+998901234567",
    description: "Nashriyotning aloqa raqami",
  })
  @Column()
  contact: string;

  @ApiProperty({
    example: "Toshkent sh., Mustaqillik ko'chasi 12",
    description: "Nashriyot manzili",
  })
  @Column()
    address: string;
    
    @OneToMany(() => Book, (book) => book.publisher)
    books: Book[];
}
