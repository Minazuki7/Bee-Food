import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcrypt from "bcrypt";

import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-user.input";
import { User, UserDocument } from "./entities/users.entity";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async create(createUserInput: CreateUserInput): Promise<User> {
    const { password: plainPassword } = createUserInput;
    const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_ROUNDS));
    const password = await bcrypt.hash(plainPassword, salt);
    return this.userModel.create({ ...createUserInput, password });
  }

  async findAll() {
    return this.userModel.find().exec();
  }

  async findById(id: string) {
    return this.userModel.findById(id).exec();
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    return this.userModel.findByIdAndUpdate(id, updateUserInput).exec();
  }

  async remove(id: string) {
    return this.userModel.findByIdAndRemove(id).exec();
  }
  async findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async findOne<T extends Record<string, string>>(param: T) {
    return this.userModel.findOne({ param }).exec();
  }
}
