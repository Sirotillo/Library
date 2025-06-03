import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from "@nestjs/common";
import { UsersService } from "../../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "../../users/dto/create-user.dto";
import * as bcrypt from "bcrypt";
import { Response } from "express";
import { User } from "../../users/entities/user.entity";
import { SignInDto } from "../dto/sign-in.dto";
import { MailService } from "../../mail/mail.service";

@Injectable()
export class AuthUserService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService
  ) {}

  async generateTokens(user: User) {
    const payload = {
      id: user.id,
      email: user.email,
      type: "user",
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async signUp(createUserDto: CreateUserDto) {
    const candidate = await this.usersService.findByEmail(createUserDto.email);
    if (candidate) {
      throw new ConflictException("Bunday emaili bemor mavjud");
    }

    const { newUser } = await this.usersService.create(createUserDto); 

    return { message: "Foydalanuvchi qo‘shildi", userId: newUser.id };
  }

  async signIn(signInDto: SignInDto, res: Response) {
    const user = await this.usersService.findByEmail(signInDto.email);

    if (!user) {
      throw new BadRequestException("Email yoki parol noto‘g‘ri");
    }

    if (!user.is_active) {
      throw new BadRequestException("Avval emailni tasdiqlang");
    }

    const isValidPassword = await bcrypt.compare(
      signInDto.password,
      user.password
    );
    if (!isValidPassword) {
      throw new BadRequestException("Email yoki parol noto‘g‘ri");
    }

    const { accessToken, refreshToken } = await this.generateTokens(user);

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME),
    });

    const hashedRefreshToken = await bcrypt.hash(refreshToken, 7);
    await this.usersService.updateRefreshToken(user.id, hashedRefreshToken);

    return { message: "Tizimga xush kelibsiz", accessToken };
  }

  async refreshToken(userId: number, refresh_token: string, res: Response) {
    const decodedToken = await this.jwtService.verify(refresh_token, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });

    if (userId !== decodedToken["id"]) {
      throw new ForbiddenException("Ruxsat etilmagan");
    }

    const user = await this.usersService.findOne(userId);
    if (!user || !user.refresh_token) {
      throw new NotFoundException("Foydalanuvchi topilmadi");
    }

    const tokenMatch = await bcrypt.compare(refresh_token, user.refresh_token);
    if (!tokenMatch) {
      throw new ForbiddenException("Refresh token mos emas");
    }

    const { accessToken, refreshToken } = await this.generateTokens(user);

    const hashedRefreshToken = await bcrypt.hash(refreshToken, 7);
    await this.usersService.updateRefreshToken(user.id, hashedRefreshToken);

    res.cookie("refresh_token", refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });

    return {
      message: "Foydalanuvchi yangilandi",
      userId: user.id,
      access_token: accessToken,
    };
  }

  async signOut(refreshToken: string, res: Response) {
    const userData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });

    if (!userData) {
      throw new ForbiddenException("Foydalanuvchi tekshirib bo‘lmadi");
    }

    await this.usersService.updateRefreshToken(userData.id, "");
    res.clearCookie("refresh_token");

    return {
      message: "Foydalanuvchi tizimdan chiqdi",
    };
  }
}
