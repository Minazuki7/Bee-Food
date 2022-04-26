import { foodType } from "@fd-wereact/nest-common";
import { InputType, Int, Field, ID } from "@nestjs/graphql";
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { Branch } from "../../branches/entities/branch.entity";

@InputType()
export class CreateItemInput {
  @IsString()
  @IsNotEmpty()
  @Field(() => ID, { description: "branch's id" })
  branch: Branch;

  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: "item's title " })
  title: string;

  @IsString()
  @IsOptional()
  @Field(() => String, { description: "item's picture", nullable: true })
  picture: string;

  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: "item's description" })
  description: string;

  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: "item's slug" })
  slug: string;

  @IsBoolean()
  @IsNotEmpty()
  @Field(() => Boolean, { description: "item's status" })
  status: boolean;

  @IsNumber()
  @IsNotEmpty()
  @IsNotEmpty()
  @Field(() => Int, { description: "item's price" })
  price: number;

  @IsArray()
  @IsNotEmpty()
  @Field(() => [foodType], { description: "food's type" })
  foodType: foodType[];
}
