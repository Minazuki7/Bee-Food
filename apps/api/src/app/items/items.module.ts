import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { registerEnumType } from "@nestjs/graphql";

import { Item, ItemSchema } from "./entities/item.entity";
import { ItemsService } from "./items.service";
import { ItemsResolver } from "./items.resolver";
import { FOOD_TYPE } from "@fd-wereact/nest-common";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }]),
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
