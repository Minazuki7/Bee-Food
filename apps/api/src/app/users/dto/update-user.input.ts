import { CreateUserInput } from "./create-user.input";
import { InputType, Field, PartialType } from "@nestjs/graphql";
import { IsString } from "class-validator";

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {}
