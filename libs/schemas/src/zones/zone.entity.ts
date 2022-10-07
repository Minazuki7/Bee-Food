import * as mongoose from "mongoose";
import { ObjectType, Field, Int, ID } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Location } from "../locations";
import { City } from "../cites";

export type ZoneDocument = Zone & Document;

@Schema()
@ObjectType()
export class Zone {
  @Field(() => ID, { description: "Zone's _id" })
  id!: string;

  @Prop()
  @Field(() => String, { description: "Zone's  name" })
  name!: string;

  @Prop()
  @Field(() => Int, { description: "Zone Raduis in Km" })
  raduis!: number;

  @Field(() => Location, { description: "Location of the zone" })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Location" })
  location!: Location;

  @Field(() => City, { description: "Zone City" })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "City" })
  city!: City;
}

export const ZoneSchema = SchemaFactory.createForClass(Zone);

export default {
  schema: ZoneSchema,
  name: Zone.name,
};
