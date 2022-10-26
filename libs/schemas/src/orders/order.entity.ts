import { ObjectType, Field, Int, ID, registerEnumType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";

import { Zone } from "../zones";
import { Client, Driver, Branch, Company, User, Item, Menu } from "../index";

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ORDER_STATUS } from "../../enums/index";

export type OrderDocument = Order & Document;
registerEnumType(ORDER_STATUS, { name: "ORDER_STATUS" });
@Schema()
@ObjectType()
export class Order {
  @Field(() => Zone)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Zone" })
  zone!: Zone;
  @Field(() => User)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
  client!: User;
  @Field()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Driver" })
  driver!: Driver;

  @Field()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Company" })
  company!: Company;

  @Field()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Branch" })
  branch!: Branch;

  @Field(() => [Item], { description: "order's items", nullable: true })
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }],
  })
  items?: Item[];

  @Field(() => [Menu], { description: "order's menus", nullable: true })
  @Prop({
    type: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Menu" },
      { required: false },
    ],
  })
  menus?: Menu[];

  @Field(() => ID, { description: "order's _id" })
  id!: string;

  @Prop()
  @Field(() => Int, { description: "order's price" })
  price!: number;

  @Prop()
  @Field(() => Int, { description: "order's total price" })
  totalPrice!: number;

  @Prop()
  @Field(() => Int, { description: "order's deliveryFees" })
  deliveryFees!: number;

  @Prop({ type: "string", enum: ORDER_STATUS })
  @Field(() => ORDER_STATUS, { description: "order's status" })
  status!: ORDER_STATUS;

  @Prop()
  @Field(() => Date, { description: "order's time" })
  recievedAt!: string;
  @Prop()
  @Field(() => Date, { description: "order's time" })
  acceptedAt!: string;
  @Prop()
  @Field(() => Date, { description: "order's time" })
  preparingStart!: string;
  @Prop()
  @Field(() => Date, { description: "order's time" })
  readyAt!: string;
  @Prop()
  @Field(() => Date, { description: "order's time" })
  pickedAt!: string;
  @Prop()
  @Field(() => Date, { description: "order's time" })
  deliveredAt!: string;
  @Prop()
  @Field(() => Date, { description: "order's time" })
  rejectedAt!: string;
  @Prop()
  @Field(() => Date, { description: "order's time" })
  canceledAt!: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

export default {
  schema: OrderSchema,
  name: Order.name,
};
