import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { MembersService } from "./members.service";
import { CreateMemberDto } from "./dto/create-member.dto";
import { UpdateMemberDto } from "./dto/update-member.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from "@nestjs/swagger";

@ApiTags("Members")
@Controller("members")
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Post()
  @ApiOperation({ summary: "Create a new member" })
  @ApiBody({ type: CreateMemberDto })
  @ApiResponse({ status: 201, description: "Member created successfully" })
  create(@Body() createMemberDto: CreateMemberDto) {
    return this.membersService.create(createMemberDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all members" })
  @ApiResponse({ status: 200, description: "List of members" })
  findAll() {
    return this.membersService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get member by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "Member found" })
  findOne(@Param("id") id: string) {
    return this.membersService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update member by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiBody({ type: UpdateMemberDto })
  @ApiResponse({ status: 200, description: "Member updated successfully" })
  update(@Param("id") id: string, @Body() updateMemberDto: UpdateMemberDto) {
    return this.membersService.update(+id, updateMemberDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete member by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "Member deleted successfully" })
  remove(@Param("id") id: string) {
    return this.membersService.remove(+id);
  }
}
