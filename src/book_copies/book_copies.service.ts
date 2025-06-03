import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateBookCopyDto } from "./dto/create-book_copy.dto";
import { UpdateBookCopyDto } from "./dto/update-book_copy.dto";
import { BookCopy } from "./entities/book_copy.entity";
import { Book } from "../books/entities/book.entity";
import { Branch } from "../branch/entities/branch.entity";

@Injectable()
export class BookCopyService {
  constructor(
    @InjectRepository(BookCopy)
    private readonly bookCopyRepository: Repository<BookCopy>,

    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,

    @InjectRepository(Branch)
    private readonly branchRepository: Repository<Branch>
  ) {}

  async create(dto: CreateBookCopyDto): Promise<BookCopy> {
    const book = await this.bookRepository.findOne({
      where: { id: dto.book_id },
    });
    if (!book) throw new NotFoundException("Book topilmadi");

    const branch = await this.branchRepository.findOne({
      where: { id: dto.branch_id },
    });
    if (!branch) throw new NotFoundException("Branch topilmadi");

    const bookCopy = this.bookCopyRepository.create({
      condition: dto.condition,
      status: dto.status,
      barcode: dto.barcode,
      book,
      branch,
    });

    return await this.bookCopyRepository.save(bookCopy);
  }

  async findAll(): Promise<BookCopy[]> {
    return this.bookCopyRepository.find({ relations: ["book", "branch"] });
  }

  async findOne(id: number): Promise<BookCopy> {
    const bookCopy = await this.bookCopyRepository.findOne({
      where: { id },
      relations: ["book", "branch"],
    });
    if (!bookCopy) throw new NotFoundException("BookCopy topilmadi");
    return bookCopy;
  }

  async update(id: number, dto: UpdateBookCopyDto): Promise<BookCopy> {
    const bookCopy = await this.bookCopyRepository.findOne({ where: { id } });
    if (!bookCopy) throw new NotFoundException("BookCopy topilmadi");

    if (dto.book_id) {
      const book = await this.bookRepository.findOne({
        where: { id: dto.book_id },
      });
      if (!book) throw new NotFoundException("Book topilmadi");
      bookCopy.book = book;
    }

    if (dto.branch_id) {
      const branch = await this.branchRepository.findOne({
        where: { id: dto.branch_id },
      });
      if (!branch) throw new NotFoundException("Branch topilmadi");
      bookCopy.branch = branch;
    }

    if (dto.condition !== undefined) bookCopy.condition = dto.condition;
    if (dto.status !== undefined) bookCopy.status = dto.status;
    if (dto.barcode !== undefined) bookCopy.barcode = dto.barcode;

    return await this.bookCopyRepository.save(bookCopy);
  }

  async remove(id: number): Promise<void> {
    const result = await this.bookCopyRepository.delete(id);
    if (result.affected === 0)
      throw new NotFoundException("BookCopy topilmadi");
  }
}
