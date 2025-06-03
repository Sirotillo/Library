import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { CreateBookCopyDto } from "./dto/create-book_copy.dto";
import { UpdateBookCopyDto } from "./dto/update-book_copy.dto";
import { BookCopyService } from "./book_copies.service";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from "@nestjs/swagger";

@ApiTags("Book Copies")
@Controller("book-copies")
export class BookCopiesController {
  constructor(private readonly bookCopiesService: BookCopyService) {}

  @Post()
  @ApiOperation({ summary: "Create a new book copy" })
  @ApiBody({ type: CreateBookCopyDto })
  @ApiResponse({ status: 201, description: "Book copy created successfully" })
  create(@Body() createBookCopyDto: CreateBookCopyDto) {
    return this.bookCopiesService.create(createBookCopyDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all book copies" })
  @ApiResponse({ status: 200, description: "List of book copies" })
  findAll() {
    return this.bookCopiesService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a book copy by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "Book copy found" })
  findOne(@Param("id") id: string) {
    return this.bookCopiesService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a book copy by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiBody({ type: UpdateBookCopyDto })
  @ApiResponse({ status: 200, description: "Book copy updated successfully" })
  update(
    @Param("id") id: string,
    @Body() updateBookCopyDto: UpdateBookCopyDto
  ) {
    return this.bookCopiesService.update(+id, updateBookCopyDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a book copy by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "Book copy deleted successfully" })
  remove(@Param("id") id: string) {
    return this.bookCopiesService.remove(+id);
  }
}
