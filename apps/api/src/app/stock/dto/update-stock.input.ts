import { CreateStockInput } from "./create-stock.input";
import { InputType, PartialType } from "@nestjs/graphql";

@InputType()
export class UpdateStockInput extends PartialType(CreateStockInput) {}
