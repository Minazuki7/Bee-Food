import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ObjectType, Field, ID } from "@nestjs/graphql";
import * as mongoose from "mongoose";
import { Company } from "../../companies/entities/company.entity";
import { Zone } from "../../zones/entities/zone.entity";

export type DriverDocument = Driver & Document;
@Schema()
@ObjectType()
export class Driver {
  @Field(() => ID, { description: "driver's _id" })
  id: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
  })
  company: Company;

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

  @Prop()
  @Field(() => Boolean, { description: "driver's status" })
  active: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Location" })
  location: Location[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Company" })
  compnay: Company;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Zone" })
  zone: Zone;
}
export const DriverSchema = SchemaFactory.createForClass(Driver);
