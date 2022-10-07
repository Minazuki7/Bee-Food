import { InputType, Int, Field } from "@nestjs/graphql";
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

@InputType()
export class CreateCompanyInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String, { description: "compnay's  name" })
  name: string;
  @IsOptional()
  @Field(() => String, { description: "compnay's picture", nullable: true })
  picture?: string;

  @IsEmail()
  @Field(() => String, { description: "user's email" })
  email: string;
  @IsNotEmpty()
  @Field(() => String, { description: "compnay's description" })
  description: string;
  @IsNotEmpty()
  @IsNumber()
  @Field(() => Int, { description: "country's  deliveryFee" })
  deliveryFee: number;
}
