import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ObjectType, Field, ID } from "@nestjs/graphql";
import * as mongoose from "mongoose";

export type DriverDocument = Driver & Document;
@Schema()
@ObjectType()
export class Driver {
  @Field(() => ID, { description: "driver's _id" })
  id: string;

  @Prop({ unique: true })
  @Field(() => String, { description: "driver's email" })
  email: string;

  @Prop()
  @Field(() => String, { description: "driver's First name" })
  firstName: string;

  @Prop()
  @Field(() => String, { description: "driver's last name" })
  lastName: string;

  @Prop({ unique: true })
  @Field(() => String, { description: "driver's phone number" })
  phone: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Location" })
  location: Location[];
}
export const DriverSchema = SchemaFactory.createForClass(Driver);
