import { Module } from "@nestjs/common";
import { PublisherService } from "./publisher.service";
import { PublisherController } from "./publisher.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Publisher } from "./entities/publisher.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Publisher])],
  controllers: [PublisherController],
  providers: [PublisherService],
  exports: [PublisherService],
})
export class PublisherModule {}
