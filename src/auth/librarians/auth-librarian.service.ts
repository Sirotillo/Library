import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { Response } from "express";
import { SignInDto } from "../dto/sign-in.dto";
import { Librarian } from "../../librarians/entities/librarian.entity";
import { LibrariansService } from "../../librarians/librarians.service";

@Injectable()
export class AuthLibrarianService {
  constructor(
    private readonly librariansService: LibrariansService,
    private readonly jwtService: JwtService
  ) {}

  async generateTokens(librarian: Librarian) {
    const payload = {
      id: librarian.id,
      email: librarian.email,
      type: "librarian",
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

  async signIn(signInDto: SignInDto, res: Response) {
    const librarian = await this.librariansService.findByEmail(signInDto.email);
    if (!librarian) {
      throw new BadRequestException("Email yoki password notog'ri");
    }

    const isValidPassword = await bcrypt.compare(
      signInDto.password,
      librarian.password
    );

    if (!isValidPassword) {
      throw new BadRequestException("Email yoki password notog'ri");
    }

    const { accessToken, refreshToken } = await this.generateTokens(librarian);
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME),
    });
    const refresh_token = await bcrypt.hash(refreshToken, 7);
    await this.librariansService.updateRefreshToken(
      librarian.id,
      refresh_token
    );
    return { message: "Tizimga xush kelibsiz", accessToken };
  }

  async refreshToken(
    librarianId: number,
    refresh_token: string,
    res: Response
  ) {
    const decodedToken = await this.jwtService.decode(refresh_token);

    if (librarianId !== decodedToken["id"]) {
      throw new ForbiddenException("Ruxsat etilmagan");
    }
    const librarian = await this.librariansService.findOne(librarianId);

    if (!librarian || !librarian.refresh_token) {
      throw new NotFoundException("user not found");
    }

    const tokenMatch = await bcrypt.compare(
      refresh_token,
      librarian.refresh_token
    );

    if (!tokenMatch) {
      throw new ForbiddenException("Forbidden");
    }

    const { accessToken, refreshToken } = await this.generateTokens(librarian);

    const hashed_refresh_token = await bcrypt.hash(refreshToken, 7);
    await this.librariansService.updateRefreshToken(
      librarian.id,
      hashed_refresh_token
    );

    res.cookie("refresh_token", refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });

    const response = {
      message: "Librarian refreshed",
      librarianId: librarian.id,
      access_token: accessToken,
    };

    return response;
  }

  async signOut(refreshToken: string, res: Response) {
    const librarianData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!librarianData) {
      throw new ForbiddenException("User not verifed");
    }
    const refresh_token = null;
    await this.librariansService.updateRefreshToken(
      librarianData.id,
      refresh_token!
    );

    res.clearCookie("refresh_token");
    const response = {
      message: "User logged out successfully",
    };

    return response;
  }
}
