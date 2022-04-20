import { Injectable } from "@nestjs/common";
import { User, UserDocument } from "../users/entities/users.entity";
import { Model } from "mongoose";
import * as crypto from "crypto";
import { InjectModel } from "@nestjs/mongoose";
import * as moment from "moment";

import {
  RefreshToken,
  RefreshTokenDocument,
} from "./entities/refresh-token.entity";

import { AuthenticationError } from "apollo-server-express";
import { UsersService } from "../users/users.service";

@Injectable()
export class RefreshTokensService {
  constructor(
    @InjectModel(RefreshToken.name)
    private refreshTokenModel: Model<RefreshTokenDocument>,
    private userService: UsersService
  ) {}

  remove(id: string) {
    return this.refreshTokenModel.findOneAndDelete({ user: id });
  }
  async generate(user: User) {
    const userId = user.id;
    const token = `${userId}.${crypto.randomBytes(40).toString("hex")}`;
    const expires = moment().add(30, "days").toDate();
    await this.remove(userId);
    const tokenObject = await this.refreshTokenModel.create({
      token,
      user: userId,
      expires,
    });
    return tokenObject;
  }

  async handleRefresh(refreshToken: string) {
    const token = await this.refreshTokenModel.findOne({
      token: refreshToken,
    });
    if (!token) throw new AuthenticationError("Invalid token");

    const user = await this.userService.findById(
      token.user as unknown as string
    );
    if (!user) throw new AuthenticationError("Invalid token");

    const newToken = await this.generate(user);
    return {
      user,
      token: newToken,
    };
  }
}
