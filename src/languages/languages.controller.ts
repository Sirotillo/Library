import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { LanguagesService } from "./languages.service";
import { CreateLanguageDto } from "./dto/create-language.dto";
import { UpdateLanguageDto } from "./dto/update-language.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from "@nestjs/swagger";

@ApiTags("Languages")
@Controller("languages")
export class LanguagesController {
  constructor(private readonly languagesService: LanguagesService) {}

  @Post()
  @ApiOperation({ summary: "Create a new language" })
  @ApiBody({ type: CreateLanguageDto })
  @ApiResponse({ status: 201, description: "Language created successfully" })
  create(@Body() createLanguageDto: CreateLanguageDto) {
    return this.languagesService.create(createLanguageDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all languages" })
  @ApiResponse({ status: 200, description: "List of languages" })
  findAll() {
    return this.languagesService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get language by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "Language found" })
  findOne(@Param("id") id: string) {
    return this.languagesService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update language by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiBody({ type: UpdateLanguageDto })
  @ApiResponse({ status: 200, description: "Language updated successfully" })
  update(
    @Param("id") id: string,
    @Body() updateLanguageDto: UpdateLanguageDto
  ) {
    return this.languagesService.update(+id, updateLanguageDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete language by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "Language deleted successfully" })
  remove(@Param("id") id: string) {
    return this.languagesService.remove(+id);
  }
}
