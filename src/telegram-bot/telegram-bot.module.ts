import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios"; 
import { TelegramBotService } from "./telegram-bot.service";
import { BooksModule } from "../books/books.module";

@Module({
  imports: [HttpModule, BooksModule], 
  providers: [TelegramBotService],
  exports: [TelegramBotService],
})
export class TelegramBotModule {}
