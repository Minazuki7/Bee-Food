import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

import { User } from "@fd-wereact/schemas";
import { UsersService } from "../users/users.service";
import { RefreshTokensService } from "../refresh-tokens/refresh-tokens.service";
import moment = require("moment");
import { UpdateUserInput } from "../users/dto/update-user.input";

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

    if (!user.isActive) {
      throw new NotFoundException({ message: "User disabled" });
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

  async loginDriver(
    phone: string,
    password: string
  ): Promise<{
    token: string;
    refreshToken: string;
    user: User;
    expiresIn: moment.Moment;
  }> {
    const user = await this.usersService.findByPhone(phone);

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

  async ChangePassword(phone: string, password: string, newPassword: string) {
    const user = await this.usersService.findByPhone(phone);
    const { password: encryptedPassword } = user;

    if (password == newPassword)
      throw new NotFoundException({
        message: "Error: Cannot update the same password",
      });
    else {
      if (await bcrypt.compare(password, encryptedPassword)) {
        console.log(password);
        const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_ROUNDS));
        user.password = await bcrypt.hash(newPassword, salt);
        return user.save();
      }
    }
    throw new NotFoundException({ message: "Error: Can't update password" });
  }
}
