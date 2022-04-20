import { ObjectType, Field, Int, ID } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";

import { Zone } from "./../../zones/entities/zone.entity";
import { Client } from "./../../clients/entities/client.entity";
import { Driver } from "./../../drivers/entities/driver.entity";

//impoprt {Orders,order}

export type OrderDocument = Order & Document;

@Schema()
@ObjectType()
export class Order {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Zone" })
  zone: Zone;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Client" })
  client: Client;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Driver" })
  driver: Driver;

  @Field(() => ID, { description: "order's _id" })
  id: string;

  @Prop()
  @Field(() => Int, { description: "order's price" })
  price: number;

  @Prop()
  @Field(() => Int, { description: "order's deliveryprice" })
  deliveryprice: number;

  @Prop()
  @Field(() => Int, { description: "order's deliveryFees" })
  deliveryFees: number;

  /*@Prop()
 @Field(() => [String], { description: "order's status" })
 type: [string] = [Status.order] */
}
export const OrderSchema = SchemaFactory.createForClass(Order);
