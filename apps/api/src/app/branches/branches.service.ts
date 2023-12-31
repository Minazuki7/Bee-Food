import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { CreateBranchInput } from "./dto/create-branch.input";
import { UpdateBranchInput } from "./dto/update-branch.input";
import { Branch, BranchDocument } from "@fd-wereact/schemas";

@Injectable()
export class BranchesService {
  constructor(
    @InjectModel(Branch.name)
    private branchModel: Model<BranchDocument>
  ) {}
  async create(createBranchInput: CreateBranchInput): Promise<Branch> {
    const createdBranch = new this.branchModel(createBranchInput);
    return createdBranch.save();
  }

  async findAll() {
    return this.branchModel.find().populate("franchise zone company").exec();
  }
  async findByZone(zone?: string) {
    return this.branchModel
      .find({ zone: zone })
      .populate("franchise zone company")
      .exec();
  }

  async findOne(id: string) {
    return this.branchModel
      .findById(id)
      .populate("franchise zone company")
      .exec();
  }

  async update(id: string, updateBranchInput: UpdateBranchInput) {
    return this.branchModel.findByIdAndUpdate(id, updateBranchInput).exec();
  }

  remove(id: string) {
    return this.branchModel.findByIdAndRemove(id).exec();
  }
}
