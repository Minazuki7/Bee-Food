import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  Subscription,
} from "@nestjs/graphql";
import { PubSub } from "graphql-subscriptions";

import { CurrentUser } from "@fd-wereact/nest-common";
import { OrdersService } from "./orders.service";
import { SkipAuth } from "@fd-wereact/nest-common";
import { Order } from "./entities/order.entity";
import { CreateOrderInput } from "./dto/create-order.input";
import { UpdateOrderInput } from "./dto/update-order.input";
import { Client } from "../clients/entities/client.entity";

const pubSub = new PubSub();
@Resolver(() => Order)
export class OrdersResolver {
  constructor(private readonly ordersService: OrdersService) {}

  @Subscription(() => Order)
  orderAdded() {
    return pubSub.asyncIterator("orderAdded");
  }

  @Mutation(() => Order)
  async createOrder(
    @CurrentUser() client: Client,
    @Args("createOrderInput") createOrderInput: CreateOrderInput
  ) {
    const order = await this.ordersService.create(createOrderInput, client);
    pubSub.publish("orderAdded", {
      orderAdded: order,
    });
    return order;
  }

  @SkipAuth()
  @Query(() => [Order], { name: "orders" })
  findAll() {
    return this.ordersService.findAll();
  }

  @Query(() => Order, { name: "order" })
  findOne(@Args("id", { type: () => ID }) id: string) {
    return this.ordersService.findOne(id);
  }
  @Mutation(() => Order, { name: "acceptOrder" })
  acceptOrder(@Args("id", { type: () => String }) id: string) {
    return this.ordersService.statusUpdate(id);
  }
  @Mutation(() => Order, { name: "updateOrderStatus" })
  updateOrderStatus(@Args("id", { type: () => String }) id: string) {
    return this.ordersService.statusUpdate(id);
  }

  @Mutation(() => Order)
  updateOrder(
    @Args("updateOrderInput") updateOrderInput: UpdateOrderInput,
    @Args("id", { type: () => String }) id: string
  ) {
    return this.ordersService.update(id, updateOrderInput);
  }
  @Mutation(() => Order)
  statusUpdate(@Args("id", { type: () => String }) id: string) {
    return this.ordersService.statusUpdate(id);
  }
  @Mutation(() => Order)
  cancelOrder(@Args("id", { type: () => String }) id: string) {
    return this.ordersService.orderCancling(id);
  }

  @Mutation(() => Order)
  removeOrder(@Args("id", { type: () => ID }) id: string) {
    return this.ordersService.remove(id);
  }
}
