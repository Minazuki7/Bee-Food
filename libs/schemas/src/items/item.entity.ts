import { ObjectType, Field, ID, Int } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { FOOD_TYPE } from "../../../nest-common/src";
import { Category } from "../categories";
import { Branch } from "../branches";

export type ItemDocument = Item & Document;

@Schema()
@ObjectType()
export class Item {
  @Field()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Branch" })
  branch!: Branch;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "categorie" })
  category!: Category;

  // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "stock" }] })
  // stock: Stock;

  @Field(() => ID, { description: "item's _id" })
  id!: string;

  @Prop()
  @Field(() => String, { description: "item's title " })
  title!: string;

  @Prop({ required: false })
  @Field(() => String, { description: "item's picture", nullable: true })
  picture!: string;

  @Prop()
  @Field(() => String, { description: "item's description" })
  description!: string;
  @Prop()
  @Field(() => String, { description: "item's slug" })
  slug!: string;

  @Prop()
  @Field(() => Boolean, { description: "item's status" })
  status!: boolean;

  @Prop()
  @Field(() => Int, { description: "item's price" })
  price!: number;

  @Prop({ type: "string", enum: FOOD_TYPE })
  @Field(() => FOOD_TYPE, { description: "food's type" })
  foodType!: FOOD_TYPE;
}

export const ItemSchema = SchemaFactory.createForClass(Item);

export default {
  schema: ItemSchema,
  name: Item.name,
};
