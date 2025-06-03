import { PartialType } from '@nestjs/swagger';
import { CreateFineDto } from './create-fine.dto';

export class UpdateFineDto extends PartialType(CreateFineDto) {}
