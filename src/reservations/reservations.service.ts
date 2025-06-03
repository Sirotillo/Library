import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CreateReservationDto } from "./dto/create-reservation.dto";
import { UpdateReservationDto } from "./dto/update-reservation.dto";
import { User } from "../users/entities/user.entity";
import { Book } from "../books/entities/book.entity";
import { Librarian } from "../librarians/entities/librarian.entity";
import { Reservations } from "./entities/reservation.entity";

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservations)
    private reservationRepository: Repository<Reservations>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Book)
    private bookRepository: Repository<Book>,

    @InjectRepository(Librarian)
    private librarianRepository: Repository<Librarian>
  ) {}

  async create(
    createReservationDto: CreateReservationDto
  ): Promise<Reservations> {
    const user = await this.userRepository.findOneBy({
      id: createReservationDto.user_id,
    });
    if (!user) throw new NotFoundException("User not found");

    const book = await this.bookRepository.findOneBy({
      id: createReservationDto.book_id,
    });
    if (!book) throw new NotFoundException("Book not found");

    const librarian = await this.librarianRepository.findOneBy({
      id: createReservationDto.reserved_by,
    });
    if (!librarian) throw new NotFoundException("Librarian not found");

    const reservation = this.reservationRepository.create({
      reservations_date: createReservationDto.reservations_date,
      expiry_date: createReservationDto.expiry_date,
      status: createReservationDto.status,
      user,
      book,
      reservedBy: librarian,
    });

    return await this.reservationRepository.save(reservation);
  }

  async findAll(): Promise<Reservations[]> {
    return await this.reservationRepository.find({
      relations: ["user", "book", "reservedBy"],
    });
  }

  async findOne(id: number): Promise<Reservations> {
    const reservation = await this.reservationRepository.findOne({
      where: { id },
      relations: ["user", "book", "reservedBy"],
    });
    if (!reservation) throw new NotFoundException("Reservation not found");
    return reservation;
  }

  async update(
    id: number,
    updateReservationDto: UpdateReservationDto
  ): Promise<Reservations> {
    const reservation = await this.reservationRepository.findOne({
      where: { id },
      relations: ["user", "book", "reservedBy"],
    });
    if (!reservation) throw new NotFoundException("Reservation not found");

    if (updateReservationDto.user_id) {
      const user = await this.userRepository.findOneBy({
        id: updateReservationDto.user_id,
      });
      if (!user) throw new NotFoundException("User not found");
      reservation.user = user;
    }

    if (updateReservationDto.book_id) {
      const book = await this.bookRepository.findOneBy({
        id: updateReservationDto.book_id,
      });
      if (!book) throw new NotFoundException("Book not found");
      reservation.book = book;
    }

    if (updateReservationDto.reserved_by) {
      const librarian = await this.librarianRepository.findOneBy({
        id: updateReservationDto.reserved_by,
      });
      if (!librarian) throw new NotFoundException("Librarian not found");
      reservation.reservedBy = librarian;
    }

    if (updateReservationDto.reservations_date !== undefined)
      reservation.reservations_date = updateReservationDto.reservations_date;

    if (updateReservationDto.expiry_date !== undefined)
      reservation.expiry_date = updateReservationDto.expiry_date;

    if (updateReservationDto.status !== undefined)
      reservation.status = updateReservationDto.status;

    return await this.reservationRepository.save(reservation);
  }

  async remove(id: number): Promise<{ message: string }> {
    const result = await this.reservationRepository.delete(id);
    if (result.affected === 0)
      throw new NotFoundException("Reservation not found");
    return { message: "Reservation deleted successfully" };
  }
}
