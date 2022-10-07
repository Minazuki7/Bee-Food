import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { CreateFranchiseInput } from "./dto/create-franchise.input";
import { UpdateFranchiseInput } from "./dto/update-franchise.input";
import { Franchise, FranchiseDocument } from "@fd-wereact/schemas";

@Injectable()
export class FranchisesService {
  constructor(
    @InjectModel(Franchise.name)
    private franchiseModel: Model<FranchiseDocument>
  ) {}
  async create(createFranchiseInput: CreateFranchiseInput): Promise<Franchise> {
    const createdFranchise = new this.franchiseModel(createFranchiseInput);
    return createdFranchise.save();
  }

  async findAll() {
    return this.franchiseModel.find().exec();
  }

  async findOne(id: string) {
    return this.franchiseModel.findById(id).exec();
  }

  async update(id: string, updateFranchiseInput: UpdateFranchiseInput) {
    return this.franchiseModel
      .findByIdAndUpdate(id, updateFranchiseInput)
      .exec();
  }

  remove(id: string) {
    return this.franchiseModel.findByIdAndRemove(id).exec();
  }
}
