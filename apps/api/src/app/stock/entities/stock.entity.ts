import { ObjectType, Field, Int, ID } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";

import { Item } from "./../../items/entities/item.entity";

export type StockDocument = Stock & Document;

@Schema()
@ObjectType()
export class Stock {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Item" })
  item: Item;

  @Field(() => ID, { description: "stock's _id" })
  id: string;
  @Prop()
  @Field(() => Int, { description: "orginal value" })
  intial: number;
  @Prop()
  @Field(() => Int, { description: "remaning stock" })
  rest: number;
}
export const StockSchema = SchemaFactory.createForClass(Stock);
