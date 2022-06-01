import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Item } from "./../../items/entities/item.entity";
import { InputType, Int, Field, ID } from "@nestjs/graphql";

@InputType()
export class CreateStockInput {
  @IsString()
  @IsNotEmpty()
  @Field(() => ID, { description: "item's id" })
  item: string;

  @IsNumber()
  @IsNotEmpty()
  @Field(() => Int, { description: "orginal value" })
  intial: number;
}
