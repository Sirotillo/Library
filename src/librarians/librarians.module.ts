import { Module } from "@nestjs/common";
import { LibrariansService } from "./librarians.service";
import { LibrariansController } from "./librarians.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Librarian } from "./entities/librarian.entity";
import { JwtModule } from "@nestjs/jwt";
import { Branch } from "../branch/entities/branch.entity";
import { BranchModule } from "../branch/branch.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Librarian, Branch]),
    JwtModule.register({}),
    BranchModule,
  ],
  controllers: [LibrariansController],
  providers: [LibrariansService],
  exports: [LibrariansService],
})
export class LibrariansModule {}
