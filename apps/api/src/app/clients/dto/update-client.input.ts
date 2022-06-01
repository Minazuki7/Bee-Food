import { CreateClientInput } from "./create-client.input";
import { InputType, Field, PartialType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty } from "class-validator";

@InputType()
export class UpdateClientInput extends PartialType(CreateClientInput) {
  @IsEmail()
  @Field(() => String, { description: "user's email" })
  email: string;

  @IsNotEmpty()
  @Field(() => String, { description: "user's name" })
  firstName: string;

  @IsNotEmpty()
  @Field(() => String, { description: "user's last name" })
  lastName: string;

  @IsNotEmpty()
  @Field(() => String, { description: "user's phone number" })
  phone: string;
}
