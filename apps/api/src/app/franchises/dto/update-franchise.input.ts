import { CreateFranchiseInput } from "./create-franchise.input";
import { InputType, Field, PartialType } from "@nestjs/graphql";

@InputType()
export class UpdateFranchiseInput extends PartialType(CreateFranchiseInput) {}
