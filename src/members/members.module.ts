import { Module } from "@nestjs/common";
import { MembersService } from "./members.service";
import { MembersController } from "./members.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Member } from "./entities/member.entity";
import { User } from "../users/entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Member, User])],
  controllers: [MembersController],
  providers: [MembersService],
})
export class MembersModule {}
