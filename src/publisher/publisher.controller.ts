import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { PublisherService } from "./publisher.service";
import { CreatePublisherDto } from "./dto/create-publisher.dto";
import { UpdatePublisherDto } from "./dto/update-publisher.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from "@nestjs/swagger";

@ApiTags("Publisher")
@Controller("publisher")
export class PublisherController {
  constructor(private readonly publisherService: PublisherService) {}

  @Post()
  @ApiOperation({ summary: "Create a new publisher" })
  @ApiBody({ type: CreatePublisherDto })
  @ApiResponse({ status: 201, description: "Publisher created successfully" })
  create(@Body() createPublisherDto: CreatePublisherDto) {
    return this.publisherService.create(createPublisherDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all publishers" })
  @ApiResponse({ status: 200, description: "List of publishers" })
  findAll() {
    return this.publisherService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get publisher by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "Publisher found" })
  findOne(@Param("id") id: string) {
    return this.publisherService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update publisher by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiBody({ type: UpdatePublisherDto })
  @ApiResponse({ status: 200, description: "Publisher updated successfully" })
  update(
    @Param("id") id: string,
    @Body() updatePublisherDto: UpdatePublisherDto
  ) {
    return this.publisherService.update(+id, updatePublisherDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete publisher by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "Publisher deleted successfully" })
  remove(@Param("id") id: string) {
    return this.publisherService.remove(+id);
  }
}
