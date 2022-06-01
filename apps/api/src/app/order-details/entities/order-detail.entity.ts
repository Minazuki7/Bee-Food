import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ObjectType, Field, Int, ID } from "@nestjs/graphql";
import * as mongoose from "mongoose";

import { Item } from "./../../items/entities/item.entity";
import { Order } from "./../../orders/entities/order.entity";
import { Menu } from "../../menus/entities/menu.entity";

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
  items: Item[];
  @Prop({
    type: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Menu" },
      { required: false },
    ],
  })
  menu: Menu[];
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Order" })
  order: Order;

  @Field(() => ID, { description: "order's _id" })
  id: string;
  @Prop()
  @Field(() => Int, { description: "total order's price" })
  totalPrice: number;
  @Prop()
  @Field(() => Int, { description: "order's price" })
  originalPrice: number;
}
export const OrderDetailSchema = SchemaFactory.createForClass(OrderDetail);
