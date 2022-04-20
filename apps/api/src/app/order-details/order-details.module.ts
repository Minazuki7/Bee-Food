import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { OrderDetail, OrderDetailSchema } from "./entities/order-detail.entity";
import { OrderDetailsService } from "./order-details.service";
import { OrderDetailsResolver } from "./order-details.resolver";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: OrderDetail.name, schema: OrderDetailSchema },
    ]),
  ],
  providers: [OrderDetailsResolver, OrderDetailsService],
})
export class OrderDetailsModule {}
