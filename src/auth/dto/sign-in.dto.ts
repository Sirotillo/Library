import { IsEmail, isEmail, IsNotEmpty, IsString } from "class-validator";

export class SignInDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
