import { InputType, Field } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";

@InputType()
export class CreateFranchiseInput {
  @IsNotEmpty()
  @Field(() => String, { description: "franchise's name" })
  name: string;

  @IsOptional()
  @Field(() => String, { description: "franchise's picture", nullable: true })
  picture?: string;

  @IsNotEmpty()
  @Field(() => String, { description: "franchise's description" })
  description: string;

  @IsEmail()
  @Field(() => String, { description: "franchise's email" })
  email: string;
}
