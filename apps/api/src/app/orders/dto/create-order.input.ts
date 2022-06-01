import { ID } from "@nestjs/graphql";
import { InputType, Int, Field } from "@nestjs/graphql";
import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

@InputType()
export class CreateOrderInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => ID, { description: "branch's id" })
  branch: string;

  @IsOptional()
  @IsArray()
  @Field(() => [ID], { description: "items id list", nullable: true })
  items: string[];

  @IsOptional()
  @IsArray()
  @Field(() => [ID], { description: "menus list", nullable: true })
  menus: string[];
}
