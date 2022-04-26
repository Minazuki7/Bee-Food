import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { CreateStockInput } from "./dto/create-stock.input";
import { UpdateStockInput } from "./dto/update-stock.input";
import { Stock, StockDocument } from "./entities/stock.entity";

@Injectable()
export class StockService {
  constructor(
    @InjectModel(Stock.name)
    private stockModel: Model<StockDocument>
  ) {}
  async create(createStockInput: CreateStockInput): Promise<Stock> {
    const createdstock = new this.stockModel(createStockInput);
    return createdstock.save();
  }

  async findAll() {
    return this.stockModel.find().exec();
  }

  async findOne(id: string) {
    return this.stockModel.findById(id).exec();
  }

  async update(id: string, updateStockInput: UpdateStockInput) {
    return this.stockModel.findByIdAndUpdate(id, updateStockInput).exec();
  }

  remove(id: string) {
    return this.stockModel.findByIdAndRemove(id).exec();
  }
}
