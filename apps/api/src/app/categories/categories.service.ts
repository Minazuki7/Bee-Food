import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { CreateCategoryInput } from "./dto/create-category.input";
import { UpdateCategoryInput } from "./dto/update-category.input";
import { Category, CategoryDocument } from "./entities/category.entity";

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>
  ) {}
  async create(createCategoryInput: CreateCategoryInput): Promise<Category> {
    const createdCategory = new this.categoryModel(createCategoryInput);
    return createdCategory.save();
  }

  async findAll() {
    return this.categoryModel.find().exec();
  }

  async findOne(id: string) {
    return this.categoryModel.findById(id).exec();
  }

  async update(id: string, updateCategoryInput: UpdateCategoryInput) {
    return this.categoryModel.findByIdAndUpdate(id, updateCategoryInput).exec();
  }

  async remove(id: string) {
    return this.categoryModel.findByIdAndRemove(id).exec();
  }
}
