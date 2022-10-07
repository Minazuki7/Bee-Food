import { ObjectType, Field, ID, Int } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { Branch } from "../branches";

import { Item } from "../items";

export type MenuDocument = Menu & Document;

@Schema()
@ObjectType()
export class Menu {
  @Field(() => [Item])
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }] })
  items!: Item[];

  @Field(() => ID, { description: "menu's _id" })
  id!: string;

  @Prop()
  @Field(() => String, { description: "menu's name" })
  name!: string;

  @Prop()
  @Field(() => String, { description: "menu's picture", nullable: true })
  picture?: string;

  @Prop()
  @Field(() => String, { description: "menu's description" })
  description!: string;

  @Prop()
  @Field(() => Int, { description: "menu's price" })
  price!: number;

  @Prop()
  @Field(() => Boolean, { description: "menu's status" })
  status!: boolean;
  @Field()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Branch" })
  branch!: Branch;
}

export const MenuSchema = SchemaFactory.createForClass(Menu);

export default {
  schema: MenuSchema,
  name: Menu.name,
};
