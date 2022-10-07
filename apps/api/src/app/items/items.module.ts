import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { registerEnumType } from "@nestjs/graphql";

import { Item, ItemSchema } from "@fd-wereact/schemas";
import { ItemsService } from "./items.service";
import { ItemsResolver } from "./items.resolver";
import { FOOD_TYPE } from "@fd-wereact/nest-common";
import { StockModule } from "../stock/stock.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }]),
    StockModule,
  ],

  providers: [ItemsResolver, ItemsService],
  exports: [ItemsService],
})
export class ItemsModule {
  constructor() {
    registerEnumType(FOOD_TYPE, {
      name: "FOOD_TYPE",
    });
  }
}
