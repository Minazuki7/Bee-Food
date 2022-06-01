import { MenusModule } from "./../menus/menus.module";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { StockModule } from "./../stock/stock.module";

import { ItemsModule } from "./../items/items.module";
import { OrderDetail, OrderDetailSchema } from "./entities/order-detail.entity";
import { OrderDetailsService } from "./order-details.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: OrderDetail.name, schema: OrderDetailSchema },
    ]),
    ItemsModule,
    ItemsModule,
    StockModule,
    MenusModule,
  ],
  providers: [OrderDetailsService],
  exports: [OrderDetailsService],
})
export class OrderDetailsModule {}
