import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../../users/entities/user.entity";

@Entity()
export class Member {
  @ApiProperty({ example: 1, description: "A'zolik ID raqami" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: "Premium", description: "A'zolik turi" })
  @Column()
  membership_type: string;

  @ApiProperty({
    example: "2023-01-01",
    description: "A'zolik boshlanish sanasi",
  })
  @Column({ type: "date" })
  membership_date: Date;

  @ApiProperty({ example: "2024-01-01", description: "A'zolik tugash sanasi" })
  @Column({ type: "date" })
  membership_expiry_date: Date;

  @ApiProperty({
    example: 5,
    description: "Maksimal qarzga olingan kitoblar soni",
  })
  @Column()
  max_loan_limit: number;

  @ApiProperty({ example: "Fantastika", description: "Sevimli janr" })
  @Column()
  favourite_genre: string;

  @ManyToOne(() => User, (user) => user.members)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column()
  user_id: number;
}
