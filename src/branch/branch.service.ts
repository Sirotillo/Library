import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Branch } from "../branch/entities/branch.entity";
import { CreateBranchDto } from "../branch/dto/create-branch.dto";
import { UpdateBranchDto } from "../branch/dto/update-branch.dto";

@Injectable()
export class BranchService {
  constructor(
    @InjectRepository(Branch)
    private readonly branchRepo: Repository<Branch>
  ) {}

  async create(createBranchDto: CreateBranchDto) {
    const newBranch = this.branchRepo.create(createBranchDto);
    await this.branchRepo.save(newBranch);
    return {
      message: "Yangi filial yaratildi",
      newBranch,
    };
  }

  async findAll() {
    return await this.branchRepo.find();
  }

  async findOne(id: number) {
    const branch = await this.branchRepo.findOneBy({ id });
    if (!branch) {
      throw new NotFoundException("Filial topilmadi");
    }
    return branch;
  }

  async update(id: number, updateBranchDto: UpdateBranchDto) {
    const branch = await this.branchRepo.findOneBy({ id });
    if (!branch) {
      throw new NotFoundException("Filial topilmadi");
    }
    await this.branchRepo.update(id, updateBranchDto);
    return { message: "Filial ma'lumotlari yangilandi" };
  }

  async remove(id: number) {
    const result = await this.branchRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException("Filial topilmadi");
    }
    return { message: "Filial o‘chirildi" };
  }
}
