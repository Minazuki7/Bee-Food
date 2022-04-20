import { ObjectType, Field, ID } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";

import { Item } from "./../../items/entities/item.entity";

export type MenuDocument = Menu & Document;

@Schema()
@ObjectType()
export class Menu {
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "item" }] })
  item: Item[];

  @Field(() => ID, { description: "menu's _id" })
  id: string;

  @Prop()
  @Field(() => String, { description: "menu's name" })
  name: string;

  @Prop()
  @Field(() => String, { description: "menu's picture" })
  picture: string;

  @Prop()
  @Field(() => String, { description: "menu's description" })
  description: string;

  @Prop()
  @Field(() => Boolean, { description: "menu's status" })
  status: boolean;
}
export const MenuSchema = SchemaFactory.createForClass(Menu);
