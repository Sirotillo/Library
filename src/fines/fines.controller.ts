import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { FinesService } from "./fines.service";
import { CreateFineDto } from "./dto/create-fine.dto";
import { UpdateFineDto } from "./dto/update-fine.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from "@nestjs/swagger";

@ApiTags("Fines")
@Controller("fines")
export class FinesController {
  constructor(private readonly finesService: FinesService) {}

  @Post()
  @ApiOperation({ summary: "Create a new fine" })
  @ApiBody({ type: CreateFineDto })
  @ApiResponse({ status: 201, description: "Fine created successfully" })
  create(@Body() createFineDto: CreateFineDto) {
    return this.finesService.create(createFineDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all fines" })
  @ApiResponse({ status: 200, description: "List of fines" })
  findAll() {
    return this.finesService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get fine by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "Fine found" })
  findOne(@Param("id") id: string) {
    return this.finesService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update fine by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiBody({ type: UpdateFineDto })
  @ApiResponse({ status: 200, description: "Fine updated successfully" })
  update(@Param("id") id: string, @Body() updateFineDto: UpdateFineDto) {
    return this.finesService.update(+id, updateFineDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete fine by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "Fine deleted successfully" })
  remove(@Param("id") id: string) {
    return this.finesService.remove(+id);
  }
}
