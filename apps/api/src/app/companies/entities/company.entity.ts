import { ObjectType, Field, ID, Int } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type CompanyDocument = Company & Document;

@Schema()
@ObjectType()
export class Company {
  @Field(() => ID, { description: "company's _id" })
  id: string;

  @Prop()
  @Field(() => String, { description: "company's name" })
  name: string;

  @Prop()
  @Field(() => Int, { description: "company's  deliveryFee" })
  deliveryFee: number;
  
  @Prop()
  @Field(() => String, { description: "company's description" })
  description: string;

  @Prop({ required: false })
  @Field(() => String, { description: "company's picture", nullable: true })
  picture?: string;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
