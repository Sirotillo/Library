import { ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { CreateLibrarianDto } from "./create-librarian.dto";

export class UpdateLibrarianDto extends PartialType(CreateLibrarianDto) {}
