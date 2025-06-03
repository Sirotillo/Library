import { Controller, Get } from "@nestjs/common";
import { GoogleSheetsService } from "./google-sheets.service";
import { BooksService } from "../books/books.service";
import { AuthorService } from "../author/author.service";
import { CategoriesService } from "../categories/categories.service";

@Controller("upload")
export class UploadController {
  constructor(
    private readonly googleSheetsService: GoogleSheetsService,
    private readonly booksService: BooksService,
    private readonly authorsService: AuthorService,
    private readonly categoriesService: CategoriesService
  ) {}

  @Get("all-tables")
  async uploadAllTables() {
    const books = await this.booksService.findAll();

    const booksHeaders = [
      "ID",
      "Title",
      "ISBN",
      "Publication Year",
      "Total Pages",
      "Description",
      "Cover Image",
      "Status",
      "Price",
      "Author ID",
      "Publisher ID",
      "Category ID",
      "Language ID",
    ];

    const booksRows = books.map((book) => [
      book.id,
      book.title,
      book.isbn,
      book.publication_year,
      book.total_pages,
      book.description,
      book.cover_image,
      book.status,
      book.price,
      book.author?.id ?? null,
      book.publisher?.id ?? null,
      book.category?.id ?? null,
      book.language?.id ?? null,
    ]);

    await this.googleSheetsService.writeRows("Books", booksHeaders, booksRows);

    const authors = await this.authorsService.findAll();

    const authorsHeaders = [
      "ID",
      "First Name",
      "Last Name",
      "Birth Year",
      "Nationality",
      "Biography",
      "Website",
      "Awards",
    ];

    const authorsRows = authors.map((author) => [
      author.id,
      author.first_name,
      author.last_name,
      author.birth_year,
      author.nationality,
      author.biography,
      author.website,
      author.awards,
    ]);

    await this.googleSheetsService.writeRows(
      "Authors",
      authorsHeaders,
      authorsRows
    );

    const categories = await this.categoriesService.findAll();

    const categoriesHeaders = ["ID", "Category Name", "Description"];

    const categoriesRows = categories.map((cat) => [
      cat.id,
      cat.category_name,
      cat.description,
    ]);

    await this.googleSheetsService.writeRows(
      "Categories",
      categoriesHeaders,
      categoriesRows
    );

    return { message: "All tables uploaded successfully to Google Sheets" };
  }
}
