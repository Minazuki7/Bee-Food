import { InputType, Field } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";

@InputType()
export class CreateCountryInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String, { description: "country's  name" })
  name: string;
}
