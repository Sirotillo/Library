import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { LibrariansService } from "./librarians.service";
import { CreateLibrarianDto } from "./dto/create-librarian.dto";
import { UpdateLibrarianDto } from "./dto/update-librarian.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { JwtSelfGuard } from "../common/guards/jwt-self.guard";

@ApiBearerAuth()
@ApiTags("Librarians")
@Controller("librarians")
export class LibrariansController {
  constructor(private readonly librariansService: LibrariansService) {}

  @Post()
  @ApiOperation({ summary: "Create a new librarian" })
  @ApiBody({ type: CreateLibrarianDto })
  @ApiResponse({ status: 201, description: "Librarian created successfully" })
  @ApiResponse({
    status: 403,
    description: "Forbidden: Insufficient permissions",
  })
  create(@Body() createLibrarianDto: CreateLibrarianDto) {
    return this.librariansService.create(createLibrarianDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all librarians" })
  @ApiResponse({ status: 200, description: "List of librarians" })
  @ApiResponse({
    status: 403,
    description: "Forbidden: Insufficient permissions",
  })
  findAll() {
    return this.librariansService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get librarian by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "Librarian found" })
  @ApiResponse({
    status: 403,
    description: "Forbidden: Insufficient permissions",
  })
  @ApiResponse({ status: 404, description: "Librarian not found" })
  findOne(@Param("id") id: string) {
    return this.librariansService.findOne(+id);
  }

  @Patch(":id")
  @UseGuards(JwtSelfGuard)
  @ApiOperation({ summary: "Update librarian by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiBody({ type: UpdateLibrarianDto })
  @ApiResponse({ status: 200, description: "Librarian updated successfully" })
  @ApiResponse({
    status: 403,
    description: "Forbidden: Can only update own profile",
  })
  @ApiResponse({ status: 404, description: "Librarian not found" })
  update(
    @Param("id") id: string,
    @Body() updateLibrarianDto: UpdateLibrarianDto
  ) {
    return this.librariansService.update(+id, updateLibrarianDto);
  }

  @Delete(":id")
  @UseGuards(JwtSelfGuard)
  @ApiOperation({ summary: "Delete librarian by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "Librarian deleted successfully" })
  @ApiResponse({
    status: 403,
    description: "Forbidden: Can only delete own profile",
  })
  @ApiResponse({ status: 404, description: "Librarian not found" })
  remove(@Param("id") id: string) {
    return this.librariansService.remove(+id);
  }
}
