import { ObjectType, Field, ID } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type CountryDocument = Country & Document;

@Schema()
@ObjectType()
export class Country {
  @Field(() => ID, { description: "country's _id" })
  id!: string;

  @Prop()
  @Field(() => String, { description: "country's name" })
  name!: string;
}

export const CountrySchema = SchemaFactory.createForClass(Country);
export default {
  schema: CountrySchema,
  name: Country.name,
};
