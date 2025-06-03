import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { CreateLoanDto } from "./dto/create-loan.dto";
import { UpdateLoanDto } from "./dto/update-loan.dto";
import { LoanService } from "./loans.service";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from "@nestjs/swagger";

@ApiTags("Loans")
@Controller("loans")
export class LoansController {
  constructor(private readonly loansService: LoanService) {}

  @Post()
  @ApiOperation({ summary: "Create a new loan" })
  @ApiBody({ type: CreateLoanDto })
  @ApiResponse({ status: 201, description: "Loan created successfully" })
  create(@Body() createLoanDto: CreateLoanDto) {
    return this.loansService.create(createLoanDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all loans" })
  @ApiResponse({ status: 200, description: "List of loans" })
  findAll() {
    return this.loansService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get loan by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "Loan found" })
  findOne(@Param("id") id: string) {
    return this.loansService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update loan by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiBody({ type: UpdateLoanDto })
  @ApiResponse({ status: 200, description: "Loan updated successfully" })
  update(@Param("id") id: string, @Body() updateLoanDto: UpdateLoanDto) {
    return this.loansService.update(+id, updateLoanDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete loan by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "Loan deleted successfully" })
  remove(@Param("id") id: string) {
    return this.loansService.remove(+id);
  }
}
