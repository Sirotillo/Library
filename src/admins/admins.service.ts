import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { Admin } from "./entities/admin.entity";

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepo: Repository<Admin>
  ) {}

  async create(createAdminDto: CreateAdminDto) {
    const existingAdmin = await this.adminRepo.findOneBy({
      email: createAdminDto.email,
    });

    if (existingAdmin) {
      throw new BadRequestException("An admin with this email already exists");
    }

    const { password, ...rest } = createAdminDto;

    const hashedPassword = await bcrypt.hash(password, 7);

    const newAdmin = this.adminRepo.create({
      ...rest,
      password: hashedPassword,
    });

    await this.adminRepo.save(newAdmin);

    return { message: "New admin has been added successfully" };
  }

  async findAll() {
    return await this.adminRepo.find();
  }

  async findOne(id: number) {
    const admin = await this.adminRepo.findOneBy({ id });
    if (!admin) {
      throw new NotFoundException("Admin not found");
    }
    return admin;
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const result = await this.adminRepo.update({ id }, updateAdminDto);
    if (result.affected === 0) {
      throw new NotFoundException("Admin not found");
    }
    return { message: "Admin updated successfully" };
  }

  async remove(id: number) {
    const result = await this.adminRepo.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException("Admin not found");
    }
    return { message: "Admin deleted successfully" };
  }

  async findByEmail(email: string) {
    const admin = await this.adminRepo.findOneBy({ email });
    if (!admin) {
      throw new NotFoundException(`Admin with email: ${email} not found`);
    }
    return admin;
  }
  async updateRefreshToken(id: number, refresh_token: string) {
    await this.adminRepo.update(id, { refresh_token });
  }
}
