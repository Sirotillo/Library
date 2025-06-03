import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";

import { Book } from "./entities/book.entity";
import { CreateBookDto } from "./dto/create-book.dto";
import { UpdateBookDto } from "./dto/update-book.dto";

import { Categories } from "../categories/entities/category.entity";
import { Languages } from "../languages/entities/language.entity";
import { Author } from "../author/entities/author.entity";
import { Publisher } from "../publisher/entities/publisher.entity";

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,

    @InjectRepository(Author)
    private authorRepository: Repository<Author>,

    @InjectRepository(Publisher)
    private publisherRepository: Repository<Publisher>,

    @InjectRepository(Categories)
    private categoryRepository: Repository<Categories>,

    @InjectRepository(Languages)
    private languageRepository: Repository<Languages>
  ) {}

  async create(createBookDto: CreateBookDto) {
    const author = await this.authorRepository.findOneBy({
      id: createBookDto.author_id,
    });
    if (!author) throw new NotFoundException("Author not found");

    const publisher = await this.publisherRepository.findOneBy({
      id: createBookDto.publisher_id,
    });
    if (!publisher) throw new NotFoundException("Publisher not found");

    const category = await this.categoryRepository.findOneBy({
      id: createBookDto.category_id,
    });
    if (!category) throw new NotFoundException("Category not found");

    const language = await this.languageRepository.findOneBy({
      id: createBookDto.language_id,
    });
    if (!language) throw new NotFoundException("Language not found");

    const book = this.bookRepository.create({
      ...createBookDto,
      author,
      publisher,
      category,
      language,
    });

    return await this.bookRepository.save(book);
  }

  async findAll() {
    return await this.bookRepository.find({
      relations: ["author", "publisher", "category", "language"],
    });
  }

  async findOne(id: number) {
    const book = await this.bookRepository.findOne({
      where: { id },
      relations: ["author", "publisher", "category", "language"],
    });
    if (!book) throw new NotFoundException("Book not found");
    return book;
  }

  async searchBooksByTitle(title: string) {
    return this.bookRepository
      .createQueryBuilder("book")
      .leftJoinAndSelect("book.author", "author") // author bilan bog‘lash
      .where("book.title ILIKE :title", { title: `%${title}%` })
      .getMany();
  }

  async searchBooksByAuthor(authorName: string) {
    return await this.bookRepository.find({
      where: {
        author: {
          first_name: ILike(`%${authorName}%`),
        },
      },
      relations: ["author", "category"],
    });
  }
  

  async update(id: number, updateBookDto: UpdateBookDto) {
    const book = await this.bookRepository.findOneBy({ id });
    if (!book) throw new NotFoundException("Book not found");

    if (updateBookDto.author_id) {
      const author = await this.authorRepository.findOneBy({
        id: updateBookDto.author_id,
      });
      if (!author) throw new NotFoundException("Author not found");
      book.author = author;
    }

    if (updateBookDto.publisher_id) {
      const publisher = await this.publisherRepository.findOneBy({
        id: updateBookDto.publisher_id,
      });
      if (!publisher) throw new NotFoundException("Publisher not found");
      book.publisher = publisher;
    }

    if (updateBookDto.category_id) {
      const category = await this.categoryRepository.findOneBy({
        id: updateBookDto.category_id,
      });
      if (!category) throw new NotFoundException("Category not found");
      book.category = category;
    }

    if (updateBookDto.language_id) {
      const language = await this.languageRepository.findOneBy({
        id: updateBookDto.language_id,
      });
      if (!language) throw new NotFoundException("Language not found");
      book.language = language;
    }

    if (updateBookDto.title) book.title = updateBookDto.title;

    return await this.bookRepository.save(book);
  }

  async remove(id: number) {
    const result = await this.bookRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException("Book not found");
    return { message: "Book deleted successfully" };
  }

  async searchBooksByPrice(
    minPrice: number,
    maxPrice: number
  ): Promise<Book[]> {
    return this.bookRepository
      .createQueryBuilder("book")
      .leftJoinAndSelect("book.author", "author")
      .where("book.price BETWEEN :minPrice AND :maxPrice", {
        minPrice,
        maxPrice,
      })
      .getMany();
  }

  async searchBooksByCategory(categoryId: number): Promise<Book[]> {
    return this.bookRepository
      .createQueryBuilder("book")
      .leftJoinAndSelect("book.author", "author")
      .leftJoinAndSelect("book.category", "category")
      .where("category.id = :categoryId", { categoryId })
      .getMany();
  }
}
