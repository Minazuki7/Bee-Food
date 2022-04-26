import { InputType, Field } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class CreateCategoryInput {
  @IsNotEmpty()
  @Field(() => String, { description: "category's title" })
  title: string;
  @IsNotEmpty()
  @Field(() => String, { description: "category's description" })
  description: string;
  @IsNotEmpty()
  @Field(() => String, { description: "category's slug" })
  slug: string;
}
