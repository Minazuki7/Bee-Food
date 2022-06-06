import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";

import { ROLES } from "@fd-wereact/nest-common";
import { UsersService } from "./../users/users.service";
import { CreateUserInput } from "./../users/dto/create-user.input";
import { UpdateClientInput } from "./dto/update-client.input";
import { Client, ClientDocument } from "./entities/client.entity";

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

  async findOne(id: string) {
    return this.clientModel.findById(id).exec();
  }

  async update(id: string, updateClientInput: UpdateClientInput) {
    return this.clientModel.findByIdAndUpdate(id, updateClientInput).exec();
  }

  async remove(id: string) {
    return this.clientModel.findByIdAndRemove(id).exec();
  }
}
