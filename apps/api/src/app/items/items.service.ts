import { Model } from "mongoose";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { CreateItemInput } from "./dto/create-item.input";
import { UpdateItemInput } from "./dto/update-item.input";
import { Item, ItemDocument } from "@fd-wereact/schemas";
import { StockService } from "./../stock/stock.service";

@Injectable()
export class ItemsService {
  constructor(
    private StockService: StockService,
    @InjectModel(Item.name)
    private itemModel: Model<ItemDocument>
  ) {}
  async create(createItemInput: CreateItemInput, stock: number): Promise<Item> {
    const createdItem = new this.itemModel(createItemInput, stock);
    const itemId = createdItem.id;

    await this.StockService.create(itemId, stock);
    return createdItem.save();
  }

  async findAll() {
    return this.itemModel.find().exec();
  }

  async findOne(id: string) {
    return this.itemModel.findById(id).exec();
  }

  async findItems(branch?: string) {
    return this.itemModel.find({ branch: branch }).exec();
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
  async updateCount(stockId: string, itemId: string) {
    const item = await this.findOne(itemId);
    const stock = await this.StockService.findById(stockId);
    const reduce = 1;

    if (!item) throw new NotFoundException({ message: "item not found" });

    if (stock.rest === 0) {
      throw new NotFoundException({ message: "item out of stock" });
    } else {
      stock.rest -= reduce;
    }

    return stock.save();
  }
  async checkStock(stockId: string, itemId: string) {
    const item = await this.findOne(itemId);
    const stock = await this.StockService.findById(stockId);

    if (!item) throw new NotFoundException({ message: "item not found" });

    if (stock.rest === 0) return false;

    return true;
  }
}
