import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from "@nestjs/common";
import { BooksService } from "./books.service";
import { CreateBookDto } from "./dto/create-book.dto";
import { UpdateBookDto } from "./dto/update-book.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiQuery,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { LibrarianGuard } from "../common/guards/librarian.guard";
import { AdminGuard } from "../common/guards/admin.guard";

@ApiBearerAuth()
@ApiTags("Books")
@Controller("books")
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @UseGuards(JwtAuthGuard, LibrarianGuard)
  @ApiOperation({ summary: "Create new book (Librarian access required)" })
  @ApiBody({ type: CreateBookDto })
  @ApiResponse({ status: 201, description: "Successfully created book" })
  @ApiResponse({ status: 403, description: "Access denied" })
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all available books" })
  @ApiResponse({ status: 200, description: "Returns book list" })
  findAll() {
    return this.booksService.findAll();
  }

  @Get("search-by-author")
  @ApiOperation({ summary: "Search books by author name" })
  @ApiQuery({ name: "author", type: String, required: true })
  @ApiResponse({ status: 200, description: "Returns matching books" })
  searchByAuthor(@Query("author") author: string) {
    return this.booksService.searchBooksByAuthor(author);
  }

  @Get("search-by-title")
  @ApiOperation({ summary: "Search books by title" })
  @ApiQuery({ name: "title", type: String, required: true })
  @ApiResponse({ status: 200, description: "Returns matching books" })
  searchBooksByTitle(@Query("title") title: string) {
    return this.booksService.searchBooksByTitle(title);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get specific book by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "Returns requested book" })
  findOne(@Param("id") id: string) {
    return this.booksService.findOne(+id);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard, LibrarianGuard)
  @ApiOperation({ summary: "Update book details (Librarian access required)" })
  @ApiParam({ name: "id", type: Number })
  @ApiBody({ type: UpdateBookDto })
  @ApiResponse({ status: 200, description: "Successfully updated book" })
  @ApiResponse({ status: 403, description: "Access denied" })
  update(@Param("id") id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(+id, updateBookDto);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiOperation({ summary: "Delete book (Admin access required)" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "Successfully deleted book" })
  @ApiResponse({ status: 403, description: "Access denied" })
  remove(@Param("id") id: string) {
    return this.booksService.remove(+id);
  }
}
