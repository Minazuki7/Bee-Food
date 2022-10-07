import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcrypt from "bcrypt";

import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-user.input";
import { User, UserDocument } from "@fd-wereact/schemas";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async create(createUserInput: CreateUserInput): Promise<User> {
    const { password: plainPassword } = createUserInput;
    const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_ROUNDS));
    const password = await bcrypt.hash(plainPassword, salt);
    createUserInput.isActive = true;
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

  async disable(id: string) {
    const user = await this.userModel.findById(id).exec();
    user.isActive = false;
    return user.save();
  }
  async remove(id: string) {
    return this.userModel.findByIdAndRemove(id).exec();
  }
  async findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async findByPhone(phone: string) {
    return this.userModel.findOne({ phone }).exec();
  }
  async findActive() {
    return await this.userModel.find({ isActive: true });
  }

  async findOne<T extends Record<string, string>>(param: T) {
    return this.userModel.findOne({ param }).exec();
  }

  async displayDriver(id: string): Promise<{
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  }> {
    const user = await this.findById(id);

    const { firstName, lastName, email, phone } = user;

    return { firstName, lastName, email, phone };
  }
}
