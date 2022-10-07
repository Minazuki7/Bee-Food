import { ObjectType, Field, ID } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type CategoryDocument = Category & Document;

@Schema()
@ObjectType()
export class Category {
  @Field(() => ID, { description: "category's _id" })
  id!: string;

  @Prop()
  @Field(() => String, { description: "category's title " })
  title!: string;

  @Prop()
  @Field(() => String, { description: "category's description" })
  description!: string;

  @Prop()
  @Field(() => String, { description: "category's slug" })
  slug!: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
export default {
  schema: CategorySchema,
  name: Category.name,
};
