import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Member } from "./entities/member.entity";
import { CreateMemberDto } from "./dto/create-member.dto";
import { UpdateMemberDto } from "./dto/update-member.dto";
import { User } from "../users/entities/user.entity";

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,

    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async create(createMemberDto: CreateMemberDto) {
    const user = await this.userRepository.findOneBy({
      id: createMemberDto.user_id,
    });
    if (!user) throw new NotFoundException("User not found");

    const member = this.memberRepository.create({
      ...createMemberDto,
      user,
    });

    return await this.memberRepository.save(member);
  }

  async findAll() {
    return await this.memberRepository.find({ relations: ["user"] });
  }

  async findOne(id: number) {
    const member = await this.memberRepository.findOne({
      where: { id },
      relations: ["user"],
    });
    if (!member) throw new NotFoundException("Member not found");
    return member;
  }

  async update(id: number, updateMemberDto: UpdateMemberDto) {
    const member = await this.memberRepository.findOne({
      where: { id },
      relations: ["user"],
    });
    if (!member) throw new NotFoundException("Member not found");

    if (updateMemberDto.user_id) {
      const user = await this.userRepository.findOneBy({
        id: updateMemberDto.user_id,
      });
      if (!user) throw new NotFoundException("User not found");
      member.user = user;
    }

    Object.assign(member, updateMemberDto);

    return await this.memberRepository.save(member);
  }

  async remove(id: number) {
    const member = await this.memberRepository.findOneBy({ id });
    if (!member) throw new NotFoundException("Member not found");
    await this.memberRepository.delete(id);
    return { message: "Member deleted successfully" };
  }
}
