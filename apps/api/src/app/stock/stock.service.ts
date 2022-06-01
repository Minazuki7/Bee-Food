import { Model } from "mongoose";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { CreateStockInput } from "./dto/create-stock.input";
import { UpdateStockInput } from "./dto/update-stock.input";
import { Stock, StockDocument } from "./entities/stock.entity";
import { ItemsService } from "./../items/items.service";

@Injectable()
export class StockService {
  constructor(
    private ItemsService: ItemsService,
    @InjectModel(Stock.name)
    private stockModel: Model<StockDocument>
  ) {}
  async create({
    intial,
    ...createStockInput
  }: CreateStockInput): Promise<Stock> {
    const createdstock = new this.stockModel({
      ...createStockInput,
      rest: intial,
      intial: intial,
    });

    return createdstock.save();
  }

  async findAll() {
    return this.stockModel.find().exec();
  }

  async findById(id: string) {
    return this.stockModel.findById(id).exec();
  }

  async findItem(item: string) {
    return this.stockModel.findOne({ item }).exec();
  }

  async update(id: string, updateStockInput: UpdateStockInput) {
    return this.stockModel.findByIdAndUpdate(id, updateStockInput).exec();
  }

  async updateCount(stockId: string, itemId: string) {
    const item = await this.ItemsService.findOne(itemId);
    const stock = await this.stockModel.findByIdAndUpdate(stockId);
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
    const item = await this.ItemsService.findOne(itemId);
    const stock = await this.stockModel.findByIdAndUpdate(stockId);

    if (!item) throw new NotFoundException({ message: "item not found" });

    if (stock.rest === 0) return false;

    return true;
  }
  remove(id: string) {
    return this.stockModel.findByIdAndRemove(id).exec();
  }
}
