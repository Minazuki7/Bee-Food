import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";

import { User } from "@fd-wereact/schemas";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env["JWT_SECRET"],
    });
  }

  async validate(payload: User & { _id: string }): Promise<User> {
    const user = await this.authService.validate(payload?._id);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
