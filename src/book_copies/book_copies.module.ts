import { Module } from "@nestjs/common";
import { BookCopiesController } from "./book_copies.controller";
import { BookCopyService } from "./book_copies.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BookCopy } from "./entities/book_copy.entity";
import { Book } from "../books/entities/book.entity";
import { Branch } from "../branch/entities/branch.entity";

@Module({
  imports: [TypeOrmModule.forFeature([BookCopy, Book, Branch])],
  controllers: [BookCopiesController],
  providers: [BookCopyService],
  exports: [BookCopyService],
})
export class BookCopiesModule {}
