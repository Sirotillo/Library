import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateLibrarianDto } from "./dto/create-librarian.dto";
import { UpdateLibrarianDto } from "./dto/update-librarian.dto";
import { Librarian } from "./entities/librarian.entity";
import * as bcrypt from "bcrypt";
import { BranchService } from "../branch/branch.service";

@Injectable()
export class LibrariansService {
  constructor(
    @InjectRepository(Librarian)
    private readonly librarianRepo: Repository<Librarian>,
    private readonly branchService:BranchService
  ) {}

  async create(createLibrarianDto: CreateLibrarianDto) {
    const existing = await this.librarianRepo.findOneBy({
      email: createLibrarianDto.email,
    });

    if (existing) {
      throw new BadRequestException("Bu email allaqachon mavjud");
    }

    const hashedPassword = await bcrypt.hash(createLibrarianDto.password, 7);
    const branch = await this.branchService.findOne(createLibrarianDto.libraryBranchId)

    const newLibrarian = this.librarianRepo.create({
      ...createLibrarianDto,
      password: hashedPassword,
      library_branch:branch
    });

    await this.librarianRepo.save(newLibrarian);

    return {
      message: "Yangi kutubxonachi yaratildi",
      newLibrarian,
    };
  }

  async findAll() {
    return await this.librarianRepo.find();
  }

  async findOne(id: number) {
    const librarian = await this.librarianRepo.findOneBy({ id });

    if (!librarian) {
      throw new NotFoundException("Kutubxonachi topilmadi");
    }

    return librarian;
  }

  async update(id: number, updateLibrarianDto: UpdateLibrarianDto) {
    if (updateLibrarianDto.password) {
      updateLibrarianDto.password = await bcrypt.hash(
        updateLibrarianDto.password,7
      );
    }

    const result = await this.librarianRepo.update({id},updateLibrarianDto)

    if (result.affected === 0) {
      throw new NotFoundException("Kutubxonachi topilmadi");
    }

    return { message: "Kutubxonachi ma'lumotlari yangilandi" };
  }

  async remove(id: number) {
    const result = await this.librarianRepo.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException("Kutubxonachi topilmadi");
    }

    return { message: "Kutubxonachi o‘chirildi" };
  }

  async findByEmail(email: string) {
    const librarian = await this.librarianRepo.findOneBy({ email });
    if (!librarian) {
      throw new NotFoundException(`Admin with email: ${email} not found`);
    }
    return librarian;
  }
  async updateRefreshToken(id: number, refresh_token: string) {
    await this.librarianRepo.update(id, { refresh_token });
  }
}
