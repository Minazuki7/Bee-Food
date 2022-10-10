import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable, NotFoundException } from "@nestjs/common";

import { ROLES } from "@fd-wereact/schemas";
import { UsersService } from "./../users/users.service";
import { CreateUserInput } from "./../users/dto/create-user.input";
import { UpdateClientInput } from "./dto/update-client.input";
import { Client, ClientDocument } from "@fd-wereact/schemas";

@Injectable()
export class ClientsService {
  constructor(
    @InjectModel(Client.name) private clientModel: Model<ClientDocument>,
    private usersService: UsersService
  ) {}
  async createClient(createUserInput: CreateUserInput): Promise<Client> {
    const { role, lastName, firstName, email, phone } =
      await this.usersService.create(createUserInput);
    if (role !== ROLES.client) return;

    const createdClient = new this.clientModel({
      ...createUserInput,
      lastName,
      firstName,
      email,
      phone,
    });

    return createdClient.save();
  }

  async findAll() {
    return this.clientModel.find().exec();
  }

  async findAllActive() {
    const users = await this.usersService.findActive();
    const filltredUsers = await users.filter(
      (users) => users.role === ROLES.client
    );
    if (filltredUsers === null) {
      throw new NotFoundException({ message: "client is empty" });
    }
    const clients = Promise.all(
      filltredUsers.map(async (user) => {
        if (user.role === ROLES.client)
          return await this.findByPhone(user.phone);
      })
    );

    return clients;
  }

  async findOne(id: string) {
    return this.clientModel.findById(id).exec();
  }

  async findByPhone(phone: string) {
    return this.clientModel.findOne({ phone }).exec();
  }
  async update(id: string, updateClientInput: UpdateClientInput) {
    return this.clientModel.findByIdAndUpdate(id, updateClientInput).exec();
  }
  async updateClientInfo(id: string, UpdateClientInput: UpdateClientInput) {
    const client = await this.findOne(id);
    if (client === null) {
      throw new NotFoundException({ message: "No Client" });
    }
    const user = await this.usersService.findByEmail(client.email);

    const { firstName, lastName, email, phone } = UpdateClientInput;
    const userinput = {
      firstName,
      lastName,
      email,
      phone,
    };
    //const userinput=(UpdateClientInput.firstName,UpdateClientInput.lastName,UpdateClientInput.email,UpdateClientInput.phone)

    await this.usersService.update(user.id, userinput);
    return this.clientModel.findByIdAndUpdate(id, UpdateClientInput).exec();
  }
  async findClientByUserID(id: string) {
    const user = await this.usersService.findById(id);

    if (user.role === ROLES.client) {
      const client = await this.findByPhone(user.phone);
      return this.clientModel.findById(client.id).exec();
    }
    throw new NotFoundException({ message: "No Client" });
  }

  async remove(id: string) {
    const client = await this.findOne(id);
    const user = await this.usersService.findByEmail(client.email);
    await this.usersService.remove(user.id);
    return this.clientModel.findByIdAndRemove(id).exec();
  }
  async disable(id: string) {
    const client = await this.findOne(id);
    const user = await this.usersService.findByEmail(client.email);
    return this.usersService.disable(user.id);
  }
}
