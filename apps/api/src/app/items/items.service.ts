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
    const createdItem = new this.itemModel(createItemInput);
    return createdItem.save();
  }

  async findAll() {
    return this.itemModel.find().exec();
  }

  async findOne(id: string) {
    return this.itemModel.findById(id).exec();
  }

  async findItems(catgory?: string, branch?: string) {
    let filter: { catgory?: string; branch?: string } = {};
    if (catgory) {
      filter = { ...filter, catgory };
    }
    if (branch) {
      filter = { ...filter, branch };
    }

    return this.itemModel.find(filter).exec();
  }

  async update(id: string, updateItemInput: UpdateItemInput) {
    return this.itemModel.findByIdAndUpdate(id, updateItemInput).exec();
  }

  remove(id: string) {
    return this.itemModel.findByIdAndRemove(id).exec();
  }
  async findMany(ids: string[]) {
    return this.itemModel.find({ _id: { $in: ids } }).exec();
  }
  async itemPrice(ids: string[]) {
    const findDuplicates = (arr) =>
      arr.filter((item, index) => arr.indexOf(item) != index);

    const itemList = await this.findMany(ids);
    const duplicatedElements = findDuplicates(ids);
    const duplicatedItems = duplicatedElements
      .map((id) => itemList.filter((item) => item._id.toString() === id))
      .flat();

    const price = [...itemList, ...duplicatedItems].reduce(
      (pervPrice, itemList) => pervPrice + itemList.price,
      0
    );

    return price;
  }
}
