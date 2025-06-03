import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Fine } from "./entities/fine.entity";
import { CreateFineDto } from "./dto/create-fine.dto";
import { UpdateFineDto } from "./dto/update-fine.dto";
import { Loan } from "../loans/entities/loan.entity";
import { User } from "../users/entities/user.entity";
import { Librarian } from "../librarians/entities/librarian.entity";

@Injectable()
export class FinesService {
  constructor(
    @InjectRepository(Fine)
    private fineRepository: Repository<Fine>,

    @InjectRepository(Loan)
    private loanRepository: Repository<Loan>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Librarian)
    private librarianRepository: Repository<Librarian>
  ) {}

  async create(createFineDto: CreateFineDto): Promise<Fine> {
    const loan = await this.loanRepository.findOne({
      where: { id: createFineDto.loan_id },
    });
    const user = await this.userRepository.findOne({
      where: { id: createFineDto.user_id },
    });
    const librarian = await this.librarianRepository.findOne({
      where: { id: createFineDto.issued_by },
    });

    if (!loan || !user || !librarian) {
      throw new NotFoundException("Loan, User yoki Librarian topilmadi");
    }

    const fine = this.fineRepository.create({
      amount: createFineDto.amount,
      fine_date: createFineDto.fine_date,
      payment_status: createFineDto.payment_status,
      payment_date: createFineDto.payment_date,
      reason: createFineDto.reason,
      loan,
      user,
      issuedBy: librarian,
    });

    return this.fineRepository.save(fine);
  }

  findAll(): Promise<Fine[]> {
    return this.fineRepository.find({
      relations: ["loan", "user", "issuedBy"],
    });
  }

  async findOne(id: number): Promise<Fine> {
    const fine = await this.fineRepository.findOne({
      where: { id },
      relations: ["loan", "user", "issuedBy"],
    });
    if (!fine) throw new NotFoundException(`Fine #${id} topilmadi`);
    return fine;
  }

  async update(id: number, updateFineDto: UpdateFineDto): Promise<Fine> {
    const fine = await this.findOne(id);

    const loan = updateFineDto.loan_id
      ? await this.loanRepository.findOne({
          where: { id: updateFineDto.loan_id },
        })
      : fine.loan;

    const user = updateFineDto.user_id
      ? await this.userRepository.findOne({
          where: { id: updateFineDto.user_id },
        })
      : fine.user;

    const librarian = updateFineDto.issued_by
      ? await this.librarianRepository.findOne({
          where: { id: updateFineDto.issued_by },
        })
      : fine.issuedBy;

    Object.assign(fine, {
      ...updateFineDto,
      loan,
      user,
      issuedBy: librarian,
    });

    return this.fineRepository.save(fine);
  }

  async remove(id: number): Promise<void> {
    const fine = await this.findOne(id);
    await this.fineRepository.remove(fine);
  }
}
