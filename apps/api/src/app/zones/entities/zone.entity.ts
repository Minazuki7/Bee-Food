import * as mongoose from "mongoose";
import { ObjectType, Field, Int, ID } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Location } from "../../locations/entities/location.entity";

import { City } from "./../../cites/entities/city.entity";


export type ZoneDocument = Zone & Document;

@Schema()
@ObjectType()
export class Zone {
  @Field(() => ID, { description: "Zone's _id" })
  id: string;

  @Prop()
  @Field(() => String, { description: "Zone's  name" })
  name: string;

  @Prop()
  @Field(() => Int, { description: "Zone Raduis in Km" })
  raduis: number;


  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Location" })
  location: Location;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "City" })
  city: City;

}

export const ZoneSchema = SchemaFactory.createForClass(Zone);
