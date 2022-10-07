import { IsNotEmpty, IsNumber, IsString } from "class-validator";

import { InputType, Int, Field, ID } from "@nestjs/graphql";

@InputType()
export class CreateStockInput {
  @IsString()
  @IsNotEmpty()
  @Field(() => ID, { description: "item's id" })
  item: string;
}
