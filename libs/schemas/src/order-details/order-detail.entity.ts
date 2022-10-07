import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ObjectType, Field, Int, ID } from "@nestjs/graphql";
import * as mongoose from "mongoose";

import { Item } from "../items";
import { Order } from "../orders";
import { Menu } from "../menus";

export type OrderDetailDocument = OrderDetail & Document;

@Schema()
@ObjectType()
export class OrderDetail {
  @Prop({
    type: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
      { required: false },
    ],
  })
  items: Item[] = [];
  @Prop({
    type: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Menu" },
      { required: false },
    ],
  })
  menu: Menu[] = [];
  @Field(() => ID)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Order" })
  order: Order = new Order();
  @Field(() => ID, { description: "order's _id" })
  id!: string;
  @Prop()
  @Field(() => Int, { description: "total order's price" })
  totalPrice!: number;
  @Prop()
  @Field(() => Int, { description: "order's price" })
  originalPrice!: number;
}
export const OrderDetailSchema = SchemaFactory.createForClass(OrderDetail);

export default {
  schema: OrderDetailSchema,
  name: OrderDetail.name,
};
