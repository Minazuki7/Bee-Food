import { ObjectType, Field, ID, Int } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";

import { Country } from "../countries";

export type CityDocument = City & Document;

@Schema()
@ObjectType()
export class City {
  @Field(() => ID, { description: "city's _id" })
  id!: string;

  @Field(() => String, { description: "city's name" })
  @Prop()
  name!: string;

  @Field()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Country" })
  country: Country = new Country();
}
@ObjectType()
export class ListCites {
  @Field(() => [City], { description: "City" })
  data: City[] = [];
  @Field(() => Int, { description: "City" })
  page!: number;
  @Field(() => Int, { description: "City" })
  perPage!: number;
  @Field(() => Int, { description: "City" })
  count!: number;
  @Field(() => Int, { description: "City" })
  totalPages!: number;
}

export const CitySchema = SchemaFactory.createForClass(City);
export default {
  schema: CitySchema,
  name: City.name,
};
