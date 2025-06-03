import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AdminsModule } from "../admins/admins.module";
import { AuthAdminController } from "./admins/auth-admin.controller";
import { AuthAdminService } from "./admins/auth-admin.service";
import { UsersModule } from "../users/users.module";
import { AuthUserController } from "./users/auth-user.controller";
import { AuthUserService } from "./users/auth-user.service";
import { MailModule } from "../mail/mail.module";
import { LibrariansModule } from "../librarians/librarians.module";
import { AuthLibrarianService } from "./librarians/auth-librarian.service";
import { AuthLibrarianController } from "./librarians/auth-librarian.controller";

@Module({
  imports: [
    JwtModule.register({}),
    AdminsModule,
    UsersModule,
    LibrariansModule,
    MailModule,
  ],
  controllers: [
    AuthAdminController,
    AuthUserController,
    AuthLibrarianController,
  ],
  providers: [AuthAdminService, AuthUserService, AuthLibrarianService],
})
export class AuthModule {}
