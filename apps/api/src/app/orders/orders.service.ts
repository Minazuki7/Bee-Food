import { ORDER_STATUS } from "@fd-wereact/schemas";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CreateOrderInput } from "./dto/create-order.input";
import { UpdateOrderInput } from "./dto/update-order.input";
import { Order, OrderDocument, Client, User } from "@fd-wereact/schemas";
import { OrderDetailsService } from "./../order-details/order-details.service";
import { BranchesService } from "./../branches/branches.service";
import { GraphQLError } from "graphql";

@Injectable()
export class OrdersService {
  constructor(
    private OrderDetailsService: OrderDetailsService,
    private branchesService: BranchesService,
    @InjectModel(Order.name)
    private orderModel: Model<OrderDocument>
  ) {}
  async create(
    createOrderInput: CreateOrderInput,
    client: User
  ): Promise<Order> {
    const { items, menus } = createOrderInput;

    // get compqny , client , zone

    const createdOrder = new this.orderModel({
      ...createOrderInput,
      status: ORDER_STATUS.sent,
      sentTime: new Date().toLocaleDateString(),
    });
    const branch = await (
      await this.branchesService.findOne(createOrderInput.branch)
    ).populate("company");

    createdOrder.client = client;
    createdOrder.company = branch.company;
    createdOrder.deliveryFees = branch.company.deliveryFee;
    createdOrder.zone = createdOrder.branch.zone;

    // get price of all order details
    const orderDetails = await this.OrderDetailsService.create(
      { items, menus },
      createdOrder.id
    );
    createdOrder.price = orderDetails.totalPrice;
    createdOrder.totalPrice = createdOrder.price + createdOrder.deliveryFees;

    return createdOrder.save();
  }
  async statusUpdate(id: string) {
    //adding resto worker/driver  to be checked
    const order = await this.findOne(id);
    let deliverConfirmation: boolean;
    switch (order.status) {
      case ORDER_STATUS.sent: {
        order.status = ORDER_STATUS.confirmed;
        order.acceptedAt = new Date().toLocaleDateString();
        break;
      }
      case ORDER_STATUS.confirmed: {
        order.status = ORDER_STATUS.preparing;
        order.preparingStart = new Date().toLocaleDateString();
        break;
      }
      case ORDER_STATUS.preparing: {
        order.status = ORDER_STATUS.ready;
        order.readyAt = new Date().toLocaleDateString();
        break;
      }
      case ORDER_STATUS.ready: {
        order.status = ORDER_STATUS.delivery;
        order.pickedAt = new Date().toLocaleDateString();
        break;
      }
      case ORDER_STATUS.delivery: {
        if (deliverConfirmation) {
          order.status = ORDER_STATUS.delivered;
          order.deliveredAt = new Date().toLocaleDateString();
          break;
        }
        {
          order.status = ORDER_STATUS.refused;
          order.rejectedAt = new Date().toLocaleDateString();
        }
      }
    }
    return order.save();
  }

  async orderCancling(id: string) {
    const order = await this.findOne(id);
    order.status = ORDER_STATUS.canceled;
    return order.save();
  }

  async findAll() {
    return this.orderModel.find().populate("branch client items").exec();
  }

  async findOne(id: string) {
    return this.orderModel.findById(id).exec();
  }

  async update(id: string, updateOrderInput: UpdateOrderInput) {
    return this.orderModel.findByIdAndUpdate(id, updateOrderInput).exec();
  }

  async findNonAffectedOrders() {
    return await this.orderModel
      .find({ driver: { $exists: false } })
      .populate("zone client driver branch");
  }

  async findDriversOrders(driver: string) {
    return this.orderModel
      .find({ driver })
      .populate("zone client driver branch");
  }

  async getDriverOrders(id: string, driver: string) {
    const order = await this.orderModel.findOne({ _id: id, driver });
    if (!order) throw new GraphQLError("ORDER NOT FOUND");
    else return order;
  }

  async assignOrderToDriver(id: string, driverId: string) {
    const order = await this.orderModel.findById(id);
    if (order.driver)
      throw new GraphQLError("This order is been already taken");
    return this.orderModel.findByIdAndUpdate(id, { driver: driverId });
  }

  remove(id: string) {
    return this.orderModel.findByIdAndRemove(id).exec();
  }

  async getOrder(id: string) {
    const order = await this.OrderDetailsService.findByOrder(id);
    return order;
  }

  async setOrderStatus(id: string) {
    const order = await this.orderModel.findOneAndUpdate(
      { _id: id },
      { status: ORDER_STATUS.delivered }
    );
    console.log(order, id);
    return order;
  }
}
