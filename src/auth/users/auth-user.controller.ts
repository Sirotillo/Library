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
import { SignInDto } from "../dto/sign-in.dto";
import { CreateUserDto } from "../../users/dto/create-user.dto";
import { AuthUserService } from "./auth-user.service";

@Controller("auth/user")
export class AuthUserController {
  constructor(private readonly authService: AuthUserService) {}

  @Post("sign-up")
  async signUp(@Body() createUserDto: CreateUserDto) {
    console.log("sign up user controller");
    return this.authService.signUp(createUserDto);
  }

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

  @Post("logout")
  signout(
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signOut(refreshToken, res);
  }
}
