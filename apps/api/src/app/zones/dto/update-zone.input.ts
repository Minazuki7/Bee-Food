import { CreateZoneInput } from "./create-zone.input";
import { InputType, Field, ID, PartialType } from "@nestjs/graphql";

@InputType()
export class UpdateZoneInput extends PartialType(CreateZoneInput) {}
