import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Loan } from "./entities/loan.entity";
import { User } from "../users/entities/user.entity";
import { BookCopy } from "../book_copies/entities/book_copy.entity";
import { Librarian } from "../librarians/entities/librarian.entity";

@Injectable()
export class LoanService {
  constructor(
    @InjectRepository(Loan)
    private loanRepository: Repository<Loan>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(BookCopy)
    private bookCopyRepository: Repository<BookCopy>,

    @InjectRepository(Librarian)
    private librarianRepository: Repository<Librarian>
  ) {}

  async create(data: {
    user_id: number;
    copy_id: number;
    issued_by: number;
  }): Promise<Loan> {
    const user = await this.userRepository.findOneBy({ id: data.user_id });
    if (!user) throw new NotFoundException("User not found");

    const bookCopy = await this.bookCopyRepository.findOneBy({
      id: data.copy_id,
    });
    if (!bookCopy) throw new NotFoundException("BookCopy not found");

    const librarian = await this.librarianRepository.findOneBy({
      id: data.issued_by,
    });
    if (!librarian) throw new NotFoundException("Librarian not found");

    const loan = this.loanRepository.create({
      ...data,
      user,
      bookCopy,
      issuedBy: librarian,
    });

    return await this.loanRepository.save(loan);
  }

  async findAll(): Promise<Loan[]> {
    return await this.loanRepository.find({
      relations: ["user", "bookCopy", "issuedBy"],
    });
  }

  async findOne(id: number): Promise<Loan> {
    const loan = await this.loanRepository.findOne({
      where: { id },
      relations: ["user", "bookCopy", "issuedBy"],
    });
    if (!loan) throw new NotFoundException("Loan not found");
    return loan;
  }

  async update(
    id: number,
    data: Partial<{
      user_id?: number;
      copy_id?: number;
      issued_by?: number;
    }>
  ): Promise<Loan> {
    const loan = await this.loanRepository.findOne({
      where: { id },
      relations: ["user", "bookCopy", "issuedBy"],
    });
    if (!loan) throw new NotFoundException("Loan not found");

    if (data.user_id) {
      const user = await this.userRepository.findOneBy({ id: data.user_id });
      if (!user) throw new NotFoundException("User not found");
      loan.user = user;
    }

    if (data.copy_id) {
      const bookCopy = await this.bookCopyRepository.findOneBy({
        id: data.copy_id,
      });
      if (!bookCopy) throw new NotFoundException("BookCopy not found");
      loan.bookCopy = bookCopy;
    }

    if (data.issued_by) {
      const librarian = await this.librarianRepository.findOneBy({
        id: data.issued_by,
      });
      if (!librarian) throw new NotFoundException("Librarian not found");
      loan.issuedBy = librarian;
    }

    return await this.loanRepository.save(loan);
  }

  async remove(id: number): Promise<{ message: string }> {
    const result = await this.loanRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException("Loan not found");
    return { message: "Loan deleted successfully" };
  }
}
