import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  Subscription,
  ResolveField,
  Parent,
  ObjectType,
} from "@nestjs/graphql";
import { PubSub } from "graphql-subscriptions";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

import {
  CrudResolver,
  CurrentUser,
  PaginatedList,
  SkipAuth,
} from "@fd-wereact/nest-common";
import { OrdersService } from "./orders.service";
import {
  Order,
  OrderDocument,
  Client,
  OrderDetail,
  User,
} from "@fd-wereact/schemas";
import { CreateOrderInput } from "./dto/create-order.input";
import { UpdateOrderInput } from "./dto/update-order.input";
import { OrderDetailsService } from "./../order-details/order-details.service";
import { OrderStats } from "./dto/ordersStats.entity";

const pubSub = new PubSub();

@ObjectType()
export class PaginatedOrders extends PaginatedList(Order) {}
@Resolver(() => Order)
export class OrdersResolver extends CrudResolver(Order, PaginatedOrders) {
  constructor(
    private readonly ordersService: OrdersService,
    private OrderDetailsService: OrderDetailsService,
    @InjectModel(Order.name)
    orderModel: Model<OrderDocument>
  ) {
    super(orderModel);
  }

  @Subscription(() => Order)
  orderAdded() {
    return pubSub.asyncIterator("orderAdded");
  }

  @Mutation(() => Order)
  async createOrder(
    @CurrentUser() client: User,
    @Args("createOrderInput") createOrderInput: CreateOrderInput
  ) {
    const order = await this.ordersService.create(createOrderInput, client);
    pubSub.publish("orderAdded", {
      orderAdded: order,
    });
    return order;
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

  @Mutation(() => Order, { name: "addOrder" })
  async assignOrderToDriver(
    @Args("driverId", { type: () => String }) driverId: string,
    @Args("id", { type: () => ID }) id: string
  ) {
    return this.ordersService.assignOrderToDriver(id, driverId);
  }

  @Query(() => Order, { name: "getDriverOrders" })
  async getDriverOrders(
    @Args("driver") driver: string,
    @Args("id", { type: () => String }) id: string
  ) {
    return this.ordersService.getDriverOrders(id, driver);
  }

  @Mutation(() => Order)
  removeOrder(@Args("id", { type: () => ID }) id: string) {
    return this.ordersService.remove(id);
  }

  @Query(() => [Order], { name: "findOrders" })
  findNonAffectedOrders() {
    return this.ordersService.findNonAffectedOrders();
  }

  @Query(() => [Order], { name: "DriversOrders" })
  findDriversOrders(@Args("driver", { type: () => String }) driver: string) {
    return this.ordersService.findDriversOrders(driver);
  }

  @Query(() => OrderDetail, { name: "getOrder" })
  getOrder(@Args("id", { type: () => String }) id: string) {
    return this.ordersService.getOrder(id);
  }
  @SkipAuth()
  @Query(() => OrderStats, { name: "getStats" })
  getStats() {
    return this.ordersService.ordersStats();
  }

  // @ResolveField()
  // async items(@Parent() order: Order) {
  //   const { id } = order;
  //   const { items } = await this.OrderDetailsService.findByOrder(id);
  //   return items;
  // }

  @Mutation(() => Order, { name: "setOrderStatus" })
  setOrderStatus(@Args("id", { type: () => String }) id: string) {
    return this.ordersService.setOrderStatus(id);
  }
}
