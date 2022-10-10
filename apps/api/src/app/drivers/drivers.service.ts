import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { HttpException, Injectable, NotFoundException } from "@nestjs/common";

import { ROLES } from "@fd-wereact/schemas";
import { CreateUserInput } from "./../users/dto/create-user.input";
import { UsersService } from "./../users/users.service";
import { UpdateDriverInput } from "./dto/update-driver.input";
import { Driver, DriverDocument } from "@fd-wereact/schemas";
import { UpdateUserInput } from "../users/dto/update-user.input";

@Injectable()
export class DriversService {
  constructor(
    @InjectModel(Driver.name) private driverModel: Model<DriverDocument>,
    private usersService: UsersService
  ) {}
  async createDriver(
    createUserInput: CreateUserInput,
    zone: string,
    company: string
  ): Promise<Driver> {
    const { role, lastName, firstName, email, phone } =
      await this.usersService.create(createUserInput);
    if (role !== ROLES.driver) return;

    const createdDriver = new this.driverModel({
      ...createUserInput,
      lastName,
      firstName,
      email,
      phone,
      cash: 0,
      wallet: 0,
      status: false,
      zone: zone,
      company: company,
    });

    return createdDriver.save();
  }

  async findAll() {
    return this.driverModel.find().populate("zone company").exec();
  }
  async findAllActive() {
    const users = await this.usersService.findActive();
    const filltredUsers = await users.filter(
      (users) => users.role === ROLES.driver
    );
    if (filltredUsers === null) {
      throw new NotFoundException({ message: "drivers is empty" });
    }
    const drivers = Promise.all(
      filltredUsers.map(async (user) => {
        if (user.role === ROLES.driver)
          return await this.findByPhone(user.phone);
      })
    );

    return drivers;
  }

  async findOne(id: string) {
    return this.driverModel.findById(id).exec();
  }

  async findByPhone(phone: string) {
    return this.driverModel.findOne({ phone }).populate("zone company").exec();
  }

  async findAvailable() {
    return this.driverModel.find({ status: true }).exec();
  }

  async updateDriverInfo(id: string, UpdateDriverInput: UpdateDriverInput) {
    const driver = await this.findOne(id);
    const user = await this.usersService.findByEmail(driver.email);

    const { firstName, lastName, email, phone } = UpdateDriverInput;
    const userinput = {
      firstName,
      lastName,
      email,
      phone,
    };
    //const userinput=(UpdateDriverInput.firstName,UpdateDriverInput.lastName,UpdateDriverInput.email,UpdateDriverInput.phone)

    await this.usersService.update(user.id, userinput);
    return this.driverModel.findByIdAndUpdate(id, UpdateDriverInput).exec();
  }

  async remove(id: string) {
    const driver = await this.findOne(id);
    const user = await this.usersService.findByEmail(driver.email);
    await this.usersService.remove(user.id);
    return this.driverModel.findByIdAndRemove(id).exec();
  }

  async disable(id: string) {
    const driver = await this.findOne(id);
    const user = await this.usersService.findByEmail(driver.email);
    return await this.usersService.disable(user.id);
  }

  async updateStatus(driver: Driver) {
    const phone = driver.phone;
    const user = await this.driverModel.findOne({ phone });
    if (user.status) user.status = false;
    else user.status = true;
    return user.save();
  }
}
