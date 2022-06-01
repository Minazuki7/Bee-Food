import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { InputType, Int, Field, ID } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";
import { Item } from "../../items/entities/item.entity";

@InputType()
export class CreateMenuInput {
  @IsArray()
  @Field(() => [ID], { description: "items list" })
  items: string[];

  @IsNotEmpty()
  @IsString()
  @Field(() => String, { description: "menu's name" })
  name: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { description: "menu's picture", nullable: true })
  picture: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String, { description: "menu's description" })
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @Field(() => Int, { description: "menu's price" })
  price: number;

  @IsNotEmpty()
  @IsBoolean()
  @Field(() => Boolean, { description: "menu's status" })
  status: boolean;
}
