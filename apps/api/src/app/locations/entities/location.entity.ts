import { ObjectType, Field, Float } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";

import { Zone } from "./../../zones/entities/zone.entity";
import { Client } from "./../../clients/entities/client.entity";
import { Driver } from "./../../drivers/entities/driver.entity";

export type LocationDocument = Location & Document;

@Schema()
@ObjectType()
export class Location {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Zone" })
  zone: Zone;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Client" })
  client: Client;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Driver" })
  driver: Driver;

  @Prop()
  @Field(() => Float, { description: "longitude" })
  longitude: number;

  @Prop()
  @Field(() => Float, { description: "latitude" })
  latitude: number;
}
export const LocationSchema = SchemaFactory.createForClass(Location);
