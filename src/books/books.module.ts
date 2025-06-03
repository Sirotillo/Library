import { Module } from "@nestjs/common";
import { BooksService } from "./books.service";
import { BooksController } from "./books.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Book } from "./entities/book.entity";
import { AuthorModule } from "../author/author.module";
import { PublisherModule } from "../publisher/publisher.module";
import { CategoriesModule } from "../categories/categories.module";
import { LanguagesModule } from "../languages/languages.module";
import { Author } from "../author/entities/author.entity";
import { Publisher } from "../publisher/entities/publisher.entity";
import { Categories } from "../categories/entities/category.entity";
import { Languages } from "../languages/entities/language.entity";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    TypeOrmModule.forFeature([Book, Author, Publisher, Categories, Languages]),
    AuthorModule,
    PublisherModule,
    CategoriesModule,
    LanguagesModule,
    JwtModule.register({}),
  ],
  controllers: [BooksController],
  providers: [BooksService],
  exports: [BooksService, TypeOrmModule],
})
export class BooksModule {}
