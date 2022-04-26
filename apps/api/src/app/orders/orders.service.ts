import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CreateOrderInput } from "./dto/create-order.input";
import { UpdateOrderInput } from "./dto/update-order.input";
import { Order, OrderDocument } from "./entities/order.entity";

@Injectable()
export class OrderesService {
  constructor(
    @InjectModel(Order.name)
    private orderModel: Model<OrderDocument>
  ) {}
  async create(createOrderInput: CreateOrderInput): Promise<Order> {
    const createdorder = new this.orderModel(createOrderInput);
    return createdorder.save();
  }

  async findAll() {
    return this.orderModel.find().exec();
  }

  async findOne(id: string) {
    return this.orderModel.findById(id).exec();
  }

  async update(id: string, updateOrderInput: UpdateOrderInput) {
    return this.orderModel.findByIdAndUpdate(id, updateOrderInput).exec();
  }

  remove(id: string) {
    return this.orderModel.findByIdAndRemove(id).exec();
  }
}
