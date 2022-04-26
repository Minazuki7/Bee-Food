import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { CreateItemInput } from "./dto/create-item.input";
import { UpdateItemInput } from "./dto/update-item.input";
import { Item, ItemDocument } from "./entities/item.entity";

@Injectable()
export class ItemsService {
  constructor(
    @InjectModel(Item.name)
    private itemModel: Model<ItemDocument>
  ) {}
  async create(createItemInput: CreateItemInput): Promise<Item> {
    const createditem = new this.itemModel(createItemInput);
    return createditem.save();
  }

  async findAll() {
    return this.itemModel.find().exec();
  }

  async findOne(id: string) {
    return this.itemModel.findById(id).exec();
  }

  async update(id: string, updateItemInput: UpdateItemInput) {
    return this.itemModel.findByIdAndUpdate(id, updateItemInput).exec();
  }

  remove(id: string) {
    return this.itemModel.findByIdAndRemove(id).exec();
  }
}
