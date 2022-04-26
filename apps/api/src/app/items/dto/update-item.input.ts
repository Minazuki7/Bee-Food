import { CreateItemInput } from "./create-item.input";
import { InputType, Field, ID, PartialType } from "@nestjs/graphql";

@InputType()
export class UpdateItemInput extends PartialType(CreateItemInput) {}
