import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CreateOrderDetailInput } from "./dto/create-order-detail.input";
import { UpdateOrderDetailInput } from "./dto/update-order-detail.input";
import {
  OrderDetail,
  OrderDetailDocument,
} from "./entities/order-detail.entity";

@Injectable()
export class OrderDetailsService {
  constructor(
    @InjectModel(OrderDetail.name)
    private orderDetailModel: Model<OrderDetailDocument>
  ) {}
  async create(
    createOrderDetailInput: CreateOrderDetailInput
  ): Promise<OrderDetail> {
    const createdorderDetail = new this.orderDetailModel(
      createOrderDetailInput
    );
    return createdorderDetail.save();
  }

  async findAll() {
    return this.orderDetailModel.find().exec();
  }

  async findOne(id: string) {
    return this.orderDetailModel.findById(id).exec();
  }

  async update(id: string, updateOrderDetailInput: UpdateOrderDetailInput) {
    return this.orderDetailModel
      .findByIdAndUpdate(id, updateOrderDetailInput)
      .exec();
  }

  remove(id: string) {
    return this.orderDetailModel.findByIdAndRemove(id).exec();
  }
}
