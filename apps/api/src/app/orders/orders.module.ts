import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { registerEnumType } from "@nestjs/graphql";

import { OrdersService } from "./orders.service";
import { OrdersResolver } from "./orders.resolver";
import { Order, OrderSchema } from "./entities/order.entity";
import { status } from "@fd-wereact/nest-common";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
  ],
  providers: [OrdersResolver, OrdersService],
})
export class OrdersModule {
  constructor() {
    registerEnumType(status, {
      name: "status",
    });
  }
}
