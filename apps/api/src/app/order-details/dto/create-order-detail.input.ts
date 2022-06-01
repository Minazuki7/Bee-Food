import { IsArray, IsOptional } from "class-validator";

export class CreateOrderDetailInput {
  @IsOptional()
  @IsArray()
  items: string[];

  @IsOptional()
  @IsArray()
  menus: string[];
}
