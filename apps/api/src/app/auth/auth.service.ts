import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

import { User } from "./../users/entities/users.entity";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validate(id: string) {
    return this.usersService.findById(id);
  }

  async login(
    email: string,
    password: string
  ): Promise<{ token: string; refreshToken: string; user: User }> {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new NotFoundException({ message: "User not found" });
    }

    const { password: encryptedPassword } = user;

    const payload = user.toJSON();

    delete payload.password;

    if (await bcrypt.compare(password, encryptedPassword)) {
      return {
        token: this.jwtService.sign(payload),
        refreshToken: this.jwtService.sign(payload),
        user,
      };
    }

    throw new UnauthorizedException();
  }
}
