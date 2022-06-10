import { ObjectType, Field, Int, ID } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";

import { Zone } from "./../../zones/entities/zone.entity";
import { Client } from "./../../clients/entities/client.entity";
import { Driver } from "./../../drivers/entities/driver.entity";
import { ORDER_STATUS } from "@fd-wereact/nest-common";
import { Company } from "../../companies/entities/company.entity";
import { Branch } from "../../branches/entities/branch.entity";
import { Item } from "../../items/entities/item.entity";

//impoprt {Orders,order}

export type OrderDocument = Order & Document;

@Schema()
@ObjectType()
export class Order {
  @Field()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Zone" })
  zone: Zone;
  @Field()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Client" })
  client: Client;
  @Field()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Driver" })
  driver: Driver;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Company" })
  compnay: Company;

  @Field()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Branch" })
  branch: Branch;

  @Field(() => [String], { description: "order's items" })
  items: string[];

  @Field(() => ID, { description: "order's _id" })
  id: string;

  @Prop()
  @Field(() => Int, { description: "order's price" })
  price: number;

  @Prop()
  @Field(() => Int, { description: "order's total price" })
  totalPrice: number;

  @Prop()
  @Field(() => Int, { description: "order's deliveryFees" })
  deliveryFees: number;

  @Prop({ type: "string", enum: ORDER_STATUS })
  @Field(() => ORDER_STATUS, { description: "order's status" })
  status: ORDER_STATUS;

  @Prop()
  @Field(() => Date, { description: "order's time" })
  recievedAt: string;
  @Prop()
  @Field(() => Date, { description: "order's time" })
  acceptedAt: string;
  @Prop()
  @Field(() => Date, { description: "order's time" })
  preparingStart: string;
  @Prop()
  @Field(() => Date, { description: "order's time" })
  readyAt: string;
  @Prop()
  @Field(() => Date, { description: "order's time" })
  pickedAt: string;
  @Prop()
  @Field(() => Date, { description: "order's time" })
  deliveredAt: string;
  @Prop()
  @Field(() => Date, { description: "order's time" })
  rejectedAt: string;
  @Prop()
  @Field(() => Date, { description: "order's time" })
  canceledAt: string;
}

@ObjectType()
export class ListOrders {
  @Field(() => [Order], { description: "orders" })
  data: Order[];
  @Field(() => Int, { description: "orders" })
  page: number;
  @Field(() => Int, { description: "orders" })
  perPage: number;
  @Field(() => Int, { description: "orders" })
  count: number;
  @Field(() => Int, { description: "orders" })
  totalPages: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
