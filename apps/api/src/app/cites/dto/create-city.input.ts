import { InputType, Field, ID } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";

@InputType()
export class CreateCityInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String, { description: "city's  name" })
  name: string;

  @IsString()
  @IsNotEmpty()
  @Field(() => ID, { description: "country's id" })
  country: string;
}
