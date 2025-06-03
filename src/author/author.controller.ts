import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { AuthorService } from "./author.service";
import { CreateAuthorDto } from "./dto/create-author.dto";
import { UpdateAuthorDto } from "./dto/update-author.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from "@nestjs/swagger";

@ApiTags("Author")
@Controller("author")
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post()
  @ApiOperation({ summary: "Create a new author" })
  @ApiBody({ type: CreateAuthorDto })
  @ApiResponse({ status: 201, description: "Author created successfully" })
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorService.create(createAuthorDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all authors" })
  @ApiResponse({ status: 200, description: "List of authors" })
  findAll() {
    return this.authorService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get an author by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "Author found" })
  findOne(@Param("id") id: string) {
    return this.authorService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update an author by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiBody({ type: UpdateAuthorDto })
  @ApiResponse({ status: 200, description: "Author updated successfully" })
  update(@Param("id") id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorService.update(+id, updateAuthorDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete an author by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "Author deleted successfully" })
  remove(@Param("id") id: string) {
    return this.authorService.remove(+id);
  }
}
