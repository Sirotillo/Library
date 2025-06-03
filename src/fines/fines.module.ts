import { Module } from "@nestjs/common";
import { FinesService } from "./fines.service";
import { FinesController } from "./fines.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Fine } from "./entities/fine.entity";
import { Loan } from "../loans/entities/loan.entity";
import { User } from "../users/entities/user.entity";
import { Librarian } from "../librarians/entities/librarian.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Fine, Loan, User, Librarian])],
  controllers: [FinesController],
  providers: [FinesService],
})
export class FinesModule {}
