import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ObjectType, Field, Int, ID } from "@nestjs/graphql";
import * as mongoose from "mongoose";

import { Item } from "./../../items/entities/item.entity";
import { Branch } from "./../../branches/entities/branch.entity";
import { Order } from "./../../orders/entities/order.entity";

export type OrderDetailDocument = OrderDetail & Document;

@Schema()
@ObjectType()
export class OrderDetail {
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "item" }] })
  items: Item[];
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Order" })
  order: Order;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Branch" })
  branch: Branch;
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
