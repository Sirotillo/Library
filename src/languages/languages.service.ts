import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Languages } from "./entities/language.entity";
import { CreateLanguageDto } from "./dto/create-language.dto";
import { UpdateLanguageDto } from "./dto/update-language.dto";

@Injectable()
export class LanguagesService {
  constructor(
    @InjectRepository(Languages)
    private languageRepository: Repository<Languages>
  ) {}

  async create(createLanguageDto: CreateLanguageDto) {
    const language = this.languageRepository.create(createLanguageDto);
    return await this.languageRepository.save(language);
  }

  async findAll() {
    return await this.languageRepository.find();
  }

  async findOne(id: number) {
    return await this.languageRepository.findOneBy({ id });
  }

  async update(id: number, updateLanguageDto: UpdateLanguageDto) {
    await this.languageRepository.update(id, updateLanguageDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    return await this.languageRepository.delete(id);
  }
}
