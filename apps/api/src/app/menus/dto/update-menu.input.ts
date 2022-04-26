import { CreateMenuInput } from "./create-menu.input";
import { InputType, Field, ID, PartialType } from "@nestjs/graphql";

@InputType()
export class UpdateMenuInput extends PartialType(CreateMenuInput) {}
