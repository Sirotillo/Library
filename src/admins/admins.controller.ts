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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { AdminService } from "./admins.service";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { AdminGuard } from "../common/guards/admin.guard";
import { JwtSelfGuard } from "../common/guards/jwt-self.guard";
import { JwtSuperAdminGuard } from "../common/guards/jwt-self-superadmin.guard";

@ApiBearerAuth()
@ApiTags("Admins")
@ApiBearerAuth()
@Controller("admins")
export class AdminsController {
  constructor(private readonly adminsService: AdminService) {}

  @Post()
  // @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiOperation({ summary: "Yangi admin yaratish" })
  @ApiBody({ type: CreateAdminDto })
  @ApiResponse({ status: 201, description: "Admin muvaffaqiyatli yaratildi." })
  @ApiResponse({
    status: 400,
    description: "Noto'g'ri so'rov yoki admin allaqachon mavjud.",
  })
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminsService.create(createAdminDto);
  }

  @Get()
  // @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiOperation({ summary: "Barcha adminlarni olish" })
  @ApiResponse({ status: 200, description: "Adminlar ro'yxati qaytarildi." })
  findAll() {
    return this.adminsService.findAll();
  }

  @Get(":id")
  // @UseGuards(JwtAuthGuard, JwtSelfGuard)
  @ApiOperation({ summary: "ID bo'yicha adminni olish" })
  @ApiParam({ name: "id", type: "number", description: "Adminning ID raqami" })
  @ApiResponse({ status: 200, description: "Admin topildi." })
  @ApiResponse({ status: 404, description: "Admin topilmadi." })
  findOne(@Param("id") id: string) {
    return this.adminsService.findOne(+id);
  }

  @Patch(":id")
  // @UseGuards(JwtAuthGuard, JwtSelfGuard)
  @ApiOperation({ summary: "Admin ma'lumotlarini yangilash" })
  @ApiParam({
    name: "id",
    type: "number",
    description: "Yangilanadigan adminning ID si",
  })
  @ApiBody({ type: UpdateAdminDto })
  @ApiResponse({ status: 200, description: "Admin yangilandi." })
  @ApiResponse({ status: 404, description: "Admin topilmadi." })
  update(@Param("id") id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminsService.update(+id, updateAdminDto);
  }

  @Delete(":id")
  // @UseGuards(JwtAuthGuard, JwtSuperAdminGuard)
  @ApiOperation({ summary: "Adminni o'chirish" })
  @ApiParam({
    name: "id",
    type: "number",
    description: "O'chiriladigan adminning ID si",
  })
  @ApiResponse({ status: 200, description: "Admin o'chirildi." })
  @ApiResponse({ status: 404, description: "Admin topilmadi." })
  remove(@Param("id") id: string) {
    return this.adminsService.remove(+id);
  }
}
