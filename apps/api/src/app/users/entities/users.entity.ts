import { ObjectType, Field, Int, ID } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

import { Roles } from "@fd-wereact/nest-common";

export type UserDocument = User & Document;

@Schema()
@ObjectType()
export class User {
  @Field(() => ID, { description: "user's _id" })
  id: string;

  @Prop({ unique: true })
  @Field(() => String, { description: "user's email" })
  email: string;

  @Prop()
  @Field(() => String, { description: "user's First name" })
  firstName: string;

  @Prop()
  @Field(() => String, { description: "user's last name" })
  lastName: string;

  @Prop()
  @Field(() => String, { description: "user's password" })
  password: string;

  @Prop({ unique: true })
  @Field(() => Int, { description: "user's phone number" })
  phone: number;

  @Prop()
  @Field(() => [String], { description: "user's roles" })
  roles: [string] = [Roles.user];
  
}
export const UserSchema = SchemaFactory.createForClass(User);
