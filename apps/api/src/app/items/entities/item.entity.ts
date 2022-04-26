import { ObjectType, Field, ID, Int } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";

import { Branch } from "./../../branches/entities/branch.entity";
import { foodType } from "@fd-wereact/nest-common";

export type ItemDocument = Item & Document;

@Schema()
@ObjectType()
export class Item {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Branch" })
  branch: Branch;

  @Field(() => ID, { description: "item's _id" })
  id: string;

  @Prop()
  @Field(() => String, { description: "item's title " })
  title: string;

  @Prop({ required: false })
  @Field(() => String, { description: "item's picture", nullable: true })
  picture: string;

  @Prop()
  @Field(() => String, { description: "item's description" })
  description: string;
  @Prop()
  @Field(() => String, { description: "item's slug" })
  slug: string;

  @Prop()
  @Field(() => Boolean, { description: "item's status" })
  status: boolean;

  @Prop()
  @Field(() => Int, { description: "item's price" })
  price: number;

  @Prop()
  @Field(() => [foodType], { description: "food's type" })
  roles: foodType[];
}

export const ItemSchema = SchemaFactory.createForClass(Item);
