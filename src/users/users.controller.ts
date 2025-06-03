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
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { AdminGuard } from "../common/guards/admin.guard";
import { JwtSelfGuard } from "../common/guards/jwt-self.guard";


@ApiBearerAuth()
@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: "Create a new user" })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: "User created successfully" })
  @UseGuards(JwtAuthGuard, AdminGuard)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all users" })
  @ApiResponse({ status: 200, description: "List of users" })
  @UseGuards(JwtAuthGuard, AdminGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get user by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "User found" })
  @UseGuards(JwtAuthGuard, JwtSelfGuard) 
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update user by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, description: "User updated successfully" })
  @UseGuards(JwtAuthGuard, JwtSelfGuard) 
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete user by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "User deleted successfully" })
  @UseGuards(JwtAuthGuard, AdminGuard) 
  remove(@Param("id") id: string) {
    return this.usersService.remove(+id);
  }

  @Get("activate/:link")
  @ApiOperation({ summary: "Activate user by activation link" })
  @ApiParam({ name: "link", type: String })
  @ApiResponse({ status: 200, description: "User activated" })
  activateUser(@Param("link") link: string) {
    return this.usersService.activateUser(link);
  }
}
