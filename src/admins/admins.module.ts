import { Module } from "@nestjs/common";
import { AdminsController } from "./admins.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Admin } from "./entities/admin.entity";
import { AdminService } from "./admins.service";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [TypeOrmModule.forFeature([Admin]), JwtModule.register({})],
  controllers: [AdminsController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminsModule {}
