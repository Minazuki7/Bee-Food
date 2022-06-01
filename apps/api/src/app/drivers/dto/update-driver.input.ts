import { CreateDriverInput } from "./create-driver.input";
import { InputType, Field, PartialType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty } from "class-validator";

@InputType()
export class UpdateDriverInput extends PartialType(CreateDriverInput) {
  @IsEmail()
  @Field(() => String, { description: "driver's email" })
  email: string;

  @IsNotEmpty()
  @Field(() => String, { description: "driver's name" })
  firstName: string;

  @IsNotEmpty()
  @Field(() => String, { description: "driver's last name" })
  lastName: string;

  @IsNotEmpty()
  @Field(() => String, { description: "driver's phone number" })
  phone: string;
}
