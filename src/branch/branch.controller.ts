import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { BranchService } from "./branch.service";
import { CreateBranchDto } from "./dto/create-branch.dto";
import { UpdateBranchDto } from "./dto/update-branch.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from "@nestjs/swagger";

@ApiTags("Branch")
@Controller("branch")
export class BranchController {
  constructor(private readonly branchService: BranchService) {}

  @Post()
  @ApiOperation({ summary: "Create a new branch" })
  @ApiBody({ type: CreateBranchDto })
  @ApiResponse({ status: 201, description: "Branch created successfully" })
  create(@Body() createBranchDto: CreateBranchDto) {
    return this.branchService.create(createBranchDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all branches" })
  @ApiResponse({ status: 200, description: "List of branches" })
  findAll() {
    return this.branchService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get branch by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "Branch found" })
  findOne(@Param("id") id: string) {
    return this.branchService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update branch by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiBody({ type: UpdateBranchDto })
  @ApiResponse({ status: 200, description: "Branch updated successfully" })
  update(@Param("id") id: string, @Body() updateBranchDto: UpdateBranchDto) {
    return this.branchService.update(+id, updateBranchDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete branch by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "Branch deleted successfully" })
  remove(@Param("id") id: string) {
    return this.branchService.remove(+id);
  }
}
