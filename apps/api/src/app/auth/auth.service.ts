import { RefreshTokensService } from "./../refresh-tokens/refresh-tokens.service";
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

import { User } from "./../users/entities/users.entity";
import { UsersService } from "../users/users.service";
import moment = require("moment");

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private refreshTokenService: RefreshTokensService
  ) {}

  async validate(id: string) {
    return this.usersService.findById(id);
  }

  async login(
    email: string,
    password: string
  ): Promise<{
    token: string;
    refreshToken: string;
    user: User;
    expiresIn: moment.Moment;
  }> {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new NotFoundException({ message: "User not found" });
    }
    const expiresIn = moment().add("10h", "minutes");
    const { password: encryptedPassword } = user;

    const payload = user.toJSON();

    delete payload.password;

    const token = this.jwtService.sign(payload);

    const refreshToken = await this.refreshTokenService.generate(user);

    if (await bcrypt.compare(password, encryptedPassword)) {
      return {
        token,
        refreshToken: refreshToken.token,
        user,
        expiresIn,
      };
    }

    throw new UnauthorizedException();
  }
}
