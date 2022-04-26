import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ObjectType, Field, ID } from "@nestjs/graphql";

export type FranchiseDocument = Franchise & Document;

@Schema()
@ObjectType()
export class Franchise {
  @Field(() => ID, { description: "franchise's _id" })
  id: string;

  @Prop({ unique: true })
  @Field(() => String, { description: "franchise's name" })
  name: string;

  @Prop({ required: false })
  @Field(() => String, { description: "franchise's picture", nullable: true })
  picture?: string;

  @Prop({ unique: true })
  @Field(() => String, { description: "franchise's email" })
  email: string;

  @Prop()
  @Field(() => String, { description: "franchise's description" })
  description: string;
}
export const FranchiseSchema = SchemaFactory.createForClass(Franchise);
