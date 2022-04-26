import { ObjectType, Field, ID } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";

import { Country } from "../../countries/entities/country.entity";

export type CityDocument = City & Document;

@Schema()
@ObjectType()
export class City {
  @Field(() => ID, { description: "city's _id" })
  id: string;

  @Field(() => String, { description: "city's name" })
  @Prop()
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Country" })
  country: Country;
}

export const CitySchema = SchemaFactory.createForClass(City);
