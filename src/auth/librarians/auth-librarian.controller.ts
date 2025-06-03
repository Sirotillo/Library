import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  Res,
} from "@nestjs/common";
import { Response } from "express";
import { CookieGetter } from "../../common/decorators/cookie-getter.decorator";
import { CreateUserDto } from "../../users/dto/create-user.dto";
import { AuthLibrarianService } from "./auth-librarian.service";
import { SignInDto } from "../dto/sign-in.dto";

@Controller("auth/librarian")
export class AuthLibrarianController {
  constructor(private readonly authService: AuthLibrarianService) {}
  @Post("sign-in")
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signIn(signInDto, res);
  }

  @Post(":id/refresh")
  refresh(
    @Param("id", ParseIntPipe) id: number,
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refreshToken(id, refreshToken, res);
  }

  @Post("sign-out")
  signout(
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signOut(refreshToken, res);
  }
}
