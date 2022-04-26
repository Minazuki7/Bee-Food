import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { InputType, Int, Field, ID } from "@nestjs/graphql";

import { Item } from "./../../items/entities/item.entity";
import { Branch } from "./../../branches/entities/branch.entity";
import { Order } from "../../orders/entities/order.entity";
import { Menu } from "../../menus/entities/menu.entity";

@InputType()
export class CreateOrderDetailInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => ID, { description: "order's id" })
  order: Order;

  @IsNotEmpty()
  @IsString()
  @Field(() => ID, { description: "branch's id" })
  branch: Branch;

  @IsOptional()
  @IsArray()
  @Field(() => ID, { description: "items list", nullable: true })
  items: Item[];

  @IsOptional()
  @IsArray()
  @Field(() => ID, { description: "menus list", nullable: true })
  menus: Menu[];

  @IsNotEmpty()
  @IsNumber()
  @Field(() => Int, { description: "total order's price" })
  totalPrice: number;

  @IsNotEmpty()
  @IsNumber()
  @Field(() => Int, { description: "order's price" })
  originalPrice: number;
}
