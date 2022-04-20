import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthResolver } from "./auth.resolver";
import { UsersModule } from "../users/users.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";
import { LocalStrategy } from "./local.strategy";

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "10h" },
    }),
  ],
  providers: [AuthResolver, AuthService, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
