import { InputType, Int, Field } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

@InputType()
export class CreateCompanyInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String, { description: "compnay's  name" })
  name: string;
  @IsNotEmpty()
  @IsNumber()
  @Field(() => Int, { description: "country's  deliveryFee" })
  deliveryFee: number;
}
