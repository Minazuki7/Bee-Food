import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ObjectType, Field, ID } from "@nestjs/graphql";

export type ClientDocument = Client & Document;
@Schema()
@ObjectType()
export class Client {
  @Field(() => ID, { description: "client's _id" })
  id: string;

  @Prop({ unique: true })
  @Field(() => String, { description: "client's email" })
  email: string;

  @Prop()
  @Field(() => String, { description: "client's First name" })
  firstName: string;

  @Prop()
  @Field(() => String, { description: "client's last name" })
  lastName: string;

  @Prop({ unique: true })
  @Field(() => String, { description: "client's phone number" })
  phone: string;
}
export const ClientSchema = SchemaFactory.createForClass(Client);
