import { Resolver, Query, Mutation, Args, ID } from "@nestjs/graphql";
import { SkipAuth } from "@fd-wereact/nest-common";

import { OrderesService } from "./orders.service";
import { Order } from "./entities/order.entity";
import { CreateOrderInput } from "./dto/create-order.input";
import { UpdateOrderInput } from "./dto/update-order.input";

@Resolver(() => Order)
export class OrdersResolver {
  constructor(private readonly ordersService: OrderesService) {}

  @Mutation(() => Order)
  createOrder(@Args("createOrderInput") createOrderInput: CreateOrderInput) {
    return this.ordersService.create(createOrderInput);
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

  @Mutation(() => Order)
  updateOrder(
    @Args("updateOrderInput") updateOrderInput: UpdateOrderInput,
    @Args("id", { type: () => String }) id: string
  ) {
    return this.ordersService.update(id, updateOrderInput);
  }

  @Mutation(() => Order)
  removeOrder(@Args("id", { type: () => ID }) id: string) {
    return this.ordersService.remove(id);
  }
}
