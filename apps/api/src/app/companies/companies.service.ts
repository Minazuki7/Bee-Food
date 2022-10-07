import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { CreateCompanyInput } from "./dto/create-company.input";
import { UpdateCompanyInput } from "./dto/update-company.input";
import { Company, CompanyDocument } from "@fd-wereact/schemas";

@Injectable()
export class CompaniesService {
  constructor(
    @InjectModel(Company.name)
    private companyModel: Model<CompanyDocument>
  ) {}
  async create(createCompanyInput: CreateCompanyInput): Promise<Company> {
    const createdCompany = new this.companyModel(createCompanyInput);
    return createdCompany.save();
  }

  async findAll() {
    return this.companyModel.find().exec();
  }

  async findOne(id: string) {
    return this.companyModel.findById(id).exec();
  }

  async update(id: string, updateCompanyInput: UpdateCompanyInput) {
    return this.companyModel.findByIdAndUpdate(id, updateCompanyInput).exec();
  }

  remove(id: string) {
    return this.companyModel.findByIdAndRemove(id).exec();
  }
}
