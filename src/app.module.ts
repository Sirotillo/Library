import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminsModule } from "./admins/admins.module";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { LibrariansModule } from "./librarians/librarians.module";
import { BranchModule } from "./branch/branch.module";
import { AuthorModule } from "./author/author.module";
import { PublisherModule } from "./publisher/publisher.module";
import { CategoriesModule } from "./categories/categories.module";
import { LanguagesModule } from "./languages/languages.module";
import { BooksModule } from "./books/books.module";
import { MembersModule } from "./members/members.module";
import { BookCopiesModule } from "./book_copies/book_copies.module";
import { LoansModule } from "./loans/loans.module";
import { ReservationsModule } from "./reservations/reservations.module";
import { FinesModule } from "./fines/fines.module";
import { UploadController } from "./google-sheets/google-sheers.controller";
import { GoogleSheetsService } from "./google-sheets/google-sheets.service";
import { TelegramBotModule } from "./telegram-bot/telegram-bot.module";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "qwerty",
      database: "Library",
      autoLoadEntities: true,
      synchronize: true,
    }),
    AdminsModule,
    AuthModule,
    UsersModule,
    LibrariansModule,
    BranchModule,
    AuthorModule,
    PublisherModule,
    CategoriesModule,
    LanguagesModule,
    BooksModule,
    MembersModule,
    BookCopiesModule,
    LoansModule,
    ReservationsModule,
    FinesModule,
    TelegramBotModule,
  ],
  controllers: [UploadController],
  providers: [GoogleSheetsService],
})
export class AppModule {}
