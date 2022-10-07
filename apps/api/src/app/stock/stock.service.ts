import { Model } from "mongoose";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { CreateStockInput } from "./dto/create-stock.input";
import { UpdateStockInput } from "./dto/update-stock.input";
import { Stock, StockDocument } from "@fd-wereact/schemas";
import { ItemsService } from "./../items/items.service";

@Injectable()
export class StockService {
  constructor(
    @InjectModel(Stock.name)
    private stockModel: Model<StockDocument>
  ) {}
  async create(
    createStockInput: CreateStockInput,
    intial: number
  ): Promise<Stock> {
    const createdstock = new this.stockModel({
      item: createStockInput,
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
  remove(id: string) {
    return this.stockModel.findByIdAndRemove(id).exec();
  }
}
