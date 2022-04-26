import { ID } from "@nestjs/graphql";
import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { OrderDetailsService } from "./order-details.service";
import { OrderDetail } from "./entities/order-detail.entity";
import { CreateOrderDetailInput } from "./dto/create-order-detail.input";
import { UpdateOrderDetailInput } from "./dto/update-order-detail.input";

@Resolver(() => OrderDetail)
export class OrderDetailsResolver {
  constructor(private readonly orderDetailsService: OrderDetailsService) {}

  @Mutation(() => OrderDetail)
  createOrderDetail(
    @Args("createOrderDetailInput")
    createOrderDetailInput: CreateOrderDetailInput
  ) {
    return this.orderDetailsService.create(createOrderDetailInput);
  }

  @Query(() => [OrderDetail], { name: "orderDetails" })
  findAll() {
    return this.orderDetailsService.findAll();
  }

  @Query(() => OrderDetail, { name: "orderDetail" })
  findOne(@Args("id", { type: () => ID }) id: string) {
    return this.orderDetailsService.findOne(id);
  }

  @Mutation(() => OrderDetail)
  updateOrderDetail(
    @Args("id", { type: () => String }) id: string,
    @Args("updateOrderDetailInput")
    updateOrderDetailInput: UpdateOrderDetailInput
  ) {
    return this.orderDetailsService.update(id, updateOrderDetailInput);
  }

  @Mutation(() => OrderDetail)
  removeOrderDetail(@Args("id", { type: () => ID }) id: string) {
    return this.orderDetailsService.remove(id);
  }
}
