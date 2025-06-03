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
import { ReservationsService } from "./reservations.service";
import { CreateReservationDto } from "./dto/create-reservation.dto";
import { UpdateReservationDto } from "./dto/update-reservation.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { UserGuard } from "../common/guards/user.guard";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { JwtSelfGuard } from "../common/guards/jwt-self.guard";

@ApiBearerAuth()
@ApiTags("Reservations")
@Controller("reservations")
@UseGuards(JwtAuthGuard, UserGuard)
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  @ApiOperation({ summary: "Create a new reservation" })
  @ApiBody({ type: CreateReservationDto })
  @ApiResponse({ status: 201, description: "Reservation created successfully" })
  @ApiResponse({
    status: 403,
    description: "Forbidden: Insufficient permissions",
  })
  create(@Body() createReservationDto: CreateReservationDto) {
    return this.reservationsService.create(createReservationDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all reservations" })
  @ApiResponse({ status: 200, description: "List of reservations" })
  @ApiResponse({
    status: 403,
    description: "Forbidden: Insufficient permissions",
  })
  findAll() {
    return this.reservationsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get reservation by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "Reservation found" })
  @ApiResponse({
    status: 403,
    description: "Forbidden: Insufficient permissions",
  })
  @ApiResponse({ status: 404, description: "Reservation not found" })
  findOne(@Param("id") id: string) {
    return this.reservationsService.findOne(+id);
  }

  @Patch(":id")
  @UseGuards(JwtSelfGuard)
  @ApiOperation({ summary: "Update reservation by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiBody({ type: UpdateReservationDto })
  @ApiResponse({ status: 200, description: "Reservation updated successfully" })
  @ApiResponse({
    status: 403,
    description: "Forbidden: Can only update own reservation",
  })
  @ApiResponse({ status: 404, description: "Reservation not found" })
  update(
    @Param("id") id: string,
    @Body() updateReservationDto: UpdateReservationDto
  ) {
    return this.reservationsService.update(+id, updateReservationDto);
  }

  @Delete(":id")
  @UseGuards(JwtSelfGuard)
  @ApiOperation({ summary: "Delete reservation by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "Reservation deleted successfully" })
  @ApiResponse({
    status: 403,
    description: "Forbidden: Can only delete own reservation",
  })
  @ApiResponse({ status: 404, description: "Reservation not found" })
  remove(@Param("id") id: string) {
    return this.reservationsService.remove(+id);
  }
}
