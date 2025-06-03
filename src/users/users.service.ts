import {
  BadRequestException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { MailService } from "../mail/mail.service";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private readonly mailService: MailService
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepo.findOneBy({
      email: createUserDto.email,
    });

    if (existingUser) {
      throw new BadRequestException("This email is already registered");
    }

    const { password, ...rest } = createUserDto;

    const hashedPassword = await bcrypt.hash(password, 7);

    const newUser = this.userRepo.create({
      ...rest,
      password: hashedPassword,
    });

    await this.userRepo.save(newUser);

    try {
      await this.mailService.sendMail(newUser);
    } catch (error) {
      throw new ServiceUnavailableException("Emailga xat yuborishda xatolik");
    }

    return { message: "New user created successfully", newUser };
  }

  async findAll() {
    return await this.userRepo.find();
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 7);
    }

    const result = await this.userRepo.update({ id }, updateUserDto);
    if (result.affected === 0) {
      throw new NotFoundException("User not found");
    }
    return { message: "User updated successfully" };
  }

  async remove(id: number) {
    const result = await this.userRepo.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException("User not found");
    }
    return { message: "User deleted successfully" };
  }

  async findByEmail(email: string) {
    const user = await this.userRepo.findOneBy({ email });
    return user;
  }

  async updateRefreshToken(id: number, refresh_token: string) {
    await this.userRepo.update(id, { refresh_token });
  }

  async activateUser(link: string) {
    if (!link) {
      throw new BadRequestException("Activation link not found");
    }
    const user = await this.userRepo.findOneBy({
      activate_link: link,
    });

    if (!user) {
      throw new NotFoundException("User not found or invalid link");
    }
    
    if (user.is_active) {
      throw new BadRequestException("User already activated");
    }

    user.is_active = true;
    await this.userRepo.save(user);

    return {
      message: "User activated successfully",
      is_active: user.is_active,
    };
  }
}
