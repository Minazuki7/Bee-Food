import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";

import { ROLES } from "@fd-wereact/nest-common";
import { CreateUserInput } from "./../users/dto/create-user.input";
import { UsersService } from "./../users/users.service";
import { UpdateDriverInput } from "./dto/update-driver.input";
import { Driver, DriverDocument } from "./entities/driver.entity";

@Injectable()
export class DriversService {
  constructor(
    @InjectModel(Driver.name) private driverModel: Model<DriverDocument>,
    private usersService: UsersService
  ) {}
  async createDriver(createUserInput: CreateUserInput): Promise<Driver> {
    const { role, lastName, firstName, email, phone } =
      await this.usersService.create(createUserInput);
    if (role !== ROLES.driver) return;

    const createdDriver = new this.driverModel({
      ...createUserInput,
      lastName,
      firstName,
      email,
      phone,
    });

    return createdDriver.save();
  }

  async findAll() {
    return this.driverModel.find().exec();
  }

  async findOne(id: string) {
    return this.driverModel.findById(id).exec();
  }

  async findByPhone(phone: string) {
    return this.driverModel.findOne({ phone }).exec();
  }


  async findAvailable() {
    return this.driverModel.find({ status: true }).exec();
  }

  async update(id: string, updateDriverInput: UpdateDriverInput) {
    return this.driverModel.findByIdAndUpdate(id, updateDriverInput).exec();
  }

  async remove(id: string) {
    return this.driverModel.findByIdAndRemove(id).exec();
  }
}
