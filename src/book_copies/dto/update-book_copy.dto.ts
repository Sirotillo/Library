import { PartialType } from '@nestjs/swagger';
import { CreateBookCopyDto } from './create-book_copy.dto';

export class UpdateBookCopyDto extends PartialType(CreateBookCopyDto) {}
