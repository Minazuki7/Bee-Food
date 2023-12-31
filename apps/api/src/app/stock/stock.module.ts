import { ItemsModule } from "./../items/items.module";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { Stock, StockSchema } from "@fd-wereact/schemas";
import { StockService } from "./stock.service";
import { StockResolver } from "./stock.resolver";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Stock.name, schema: StockSchema }]),
  ],
  providers: [StockResolver, StockService],
  exports: [StockService],
})
export class StockModule {}
