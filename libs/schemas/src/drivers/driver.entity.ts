import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ObjectType, Field, ID } from "@nestjs/graphql";
import * as mongoose from "mongoose";
import { Company } from "../companies";
import { Zone } from "../zones";

export type DriverDocument = Driver & Document;
@Schema()
@ObjectType()
export class Driver {
  @Field(() => ID, { description: "driver's _id" })
  id: string | undefined;

  @Prop({ unique: true })
  @Field(() => String, { description: "driver's email" })
  email!: string;

  @Prop()
  @Field(() => String, { description: "driver's First name" })
  firstName!: string;

  @Prop()
  @Field(() => String, { description: "driver's last name" })
  lastName!: string;

  @Prop({ unique: true })
  @Field(() => String, { description: "driver's phone number" })
  phone!: string;

  @Prop()
  @Field(() => String, { description: "driver's wallet" })
  wallet!: string;

  @Prop()
  @Field(() => String, { description: "driver's cash" })
  cash!: string;

  @Prop()
  @Field(() => Boolean, { description: "driver's status" })
  status!: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Location" })
  location: Location[] = [];

  @Field()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Company" })
  company: Company = new Company();

  @Field(() => Zone)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Zone" })
  zone: Zone = new Zone();
}

export const DriverSchema = SchemaFactory.createForClass(Driver);
export default {
  schema: DriverSchema,
  name: Driver.name,
};
