import { Module } from "@nestjs/common";
import { LoansController } from "./loans.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Loan } from "./entities/loan.entity";
import { User } from "../users/entities/user.entity";
import { BookCopy } from "../book_copies/entities/book_copy.entity";
import { Librarian } from "../librarians/entities/librarian.entity";
import { LoanService } from "./loans.service";

@Module({
  imports: [TypeOrmModule.forFeature([Loan, User, BookCopy, Librarian])],
  controllers: [LoansController],
  providers: [LoanService],
})
export class LoansModule {}
