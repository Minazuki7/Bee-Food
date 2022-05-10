 import { ObjectType, Field, Float } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type LocationDocument = Location & Document;

@Schema()
@ObjectType()
export class Location {
  @Prop()
  @Field(() => Float, { description: "longitude" })
  longitude: number;

  @Prop()
  @Field(() => Float, { description: "latitude" })
  latitude: number;
}
export const LocationSchema = SchemaFactory.createForClass(Location);
