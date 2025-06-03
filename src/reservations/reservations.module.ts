import { Module } from "@nestjs/common";
import { ReservationsService } from "./reservations.service";
import { ReservationsController } from "./reservations.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Reservations } from "./entities/reservation.entity";
import { User } from "../users/entities/user.entity";
import { Book } from "../books/entities/book.entity";
import { Librarian } from "../librarians/entities/librarian.entity";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [TypeOrmModule.forFeature([Reservations, User, Book, Librarian]), JwtModule.register({})],
  controllers: [ReservationsController],
  providers: [ReservationsService],
})
export class ReservationsModule {}
