import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  Subscription,
  ResolveField,
  Parent,
} from "@nestjs/graphql";
import { PubSub } from "graphql-subscriptions";

import { CurrentUser } from "@fd-wereact/nest-common";
import { OrdersService } from "./orders.service";
import { SkipAuth } from "@fd-wereact/nest-common";
import { ListOrders, Order } from "./entities/order.entity";
import { CreateOrderInput } from "./dto/create-order.input";
import { UpdateOrderInput } from "./dto/update-order.input";
import { Client } from "../clients/entities/client.entity";
import { OrderDetail } from "../order-details/entities/order-detail.entity";
import { OrderDetailsService } from "./../order-details/order-details.service";
import { ItemsService } from "./../items/items.service";

const pubSub = new PubSub();
@Resolver(() => Order)
export class OrdersResolver {
  constructor(
    private OrderDetailsService: OrderDetailsService,
    private ItemsServices: ItemsService,
    private readonly ordersService: OrdersService) {}

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
  @Query(() => ListOrders, { name: "orders" })
  async findAll() {
    const orders = await this.ordersService.findAll();

    return {
      data: orders,
      page: 1,
      perPage: 10,
      count: 10,
      totalPages: 1,
    };
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

  
  @Mutation(() => Order, { name: "addOrder"})
  async assignOrderToDriver(
    @Args("driverId", { type: () => String }) driverId: string,
    @Args("id", { type: () => ID }) id: string
  ) {
      return this.ordersService.assignOrderToDriver(id, driverId);
  }


  @Query(() => Order, { name: "getDriverOrders"})
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

  @ResolveField()
  async items(@Parent() order: Order) {
    const { id } = order;
    const Items = await this.OrderDetailsService.findByOrder(id);
    return Items.items;
  }

  @Mutation(() => Order, { name: "setOrderStatus" })
  setOrderStatus(@Args("id", { type: () => String }) id: string) {
    return this.ordersService.setOrderStatus(id);
  }
}
