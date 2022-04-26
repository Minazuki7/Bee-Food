import { CreateOrderDetailInput } from "./create-order-detail.input";
import { InputType, Field, ID, PartialType } from "@nestjs/graphql";

@InputType()
export class UpdateOrderDetailInput extends PartialType(
  CreateOrderDetailInput
) {}
