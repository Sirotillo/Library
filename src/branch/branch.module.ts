import { Module } from "@nestjs/common";
import { BranchService } from "./branch.service";
import { BranchController } from "./branch.controller";
import { Branch } from "./entities/branch.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Librarian } from "../librarians/entities/librarian.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Branch, Librarian])],
  controllers: [BranchController],
  providers: [BranchService],
  exports: [BranchService],
})
export class BranchModule {}
