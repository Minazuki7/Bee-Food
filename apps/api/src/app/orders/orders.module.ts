import { BranchesModule } from "./../branches/branches.module";
import { OrderDetailsModule } from "./../order-details/order-details.module";
import { ItemsModule } from "./../items/items.module";
import { StockModule } from "./../stock/stock.module";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { registerEnumType } from "@nestjs/graphql";

import { OrdersService } from "./orders.service";
import { OrdersResolver } from "./orders.resolver";
import { Order, OrderSchema } from "@fd-wereact/schemas";
import { ORDER_STATUS } from "@fd-wereact/schemas";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    StockModule,
    ItemsModule,
    OrderDetailsModule,
    BranchesModule,
  ],
  providers: [OrdersResolver, OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {
  constructor() {
    registerEnumType(ORDER_STATUS, {
      name: "status",
    });
  }
}
