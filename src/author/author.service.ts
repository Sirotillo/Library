import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateAuthorDto } from "./dto/create-author.dto";
import { UpdateAuthorDto } from "./dto/update-author.dto";
import { Author } from "./entities/author.entity";

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author) private authorRepo: Repository<Author>
  ) {}

  async create(createAuthorDto: CreateAuthorDto) {
    const existingAuthor = await this.authorRepo.findOne({
      where: {
        first_name: createAuthorDto.first_name,
        last_name: createAuthorDto.last_name,
      },
    });

    if (existingAuthor) {
      throw new BadRequestException("Bu muallif allaqachon mavjud");
    }

    const newAuthor = this.authorRepo.create(createAuthorDto);
    await this.authorRepo.save(newAuthor);

    return { message: "Yangi muallif muvaffaqiyatli yaratildi", newAuthor };
  }

  async findAll() {
    return await this.authorRepo.find();
  }

  async findOne(id: number) {
    const author = await this.authorRepo.findOneBy({ id });
    if (!author) {
      throw new NotFoundException("Muallif topilmadi");
    }
    return author;
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto) {
    const author = await this.authorRepo.findOneBy({ id });
    if (!author) {
      throw new NotFoundException("Muallif topilmadi");
    }

    await this.authorRepo.update({ id }, updateAuthorDto);
    return { message: "Muallif muvaffaqiyatli yangilandi" };
  }

  async remove(id: number) {
    const result = await this.authorRepo.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException("Muallif topilmadi");
    }
    return { message: "Muallif muvaffaqiyatli o‘chirildi" };
  }
}
