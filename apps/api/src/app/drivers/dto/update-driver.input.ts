import { CreateDriverInput } from "./create-driver.input";
import { InputType, Field, PartialType, ID } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty } from "class-validator";

@InputType()
export class UpdateDriverInput extends PartialType(CreateDriverInput) {
  @IsEmail()
  @Field(() => String, { description: "driver's email", nullable: true })
  email?: string;

  @Field(() => String, { description: "driver's name", nullable: true })
  firstName?: string;

  @Field(() => String, { description: "driver's last name", nullable: true })
  lastName?: string;

  @Field(() => String, { description: "driver's phone number", nullable: true })
  phone?: string;

  @Field(() => String, { description: "driver's cash", nullable: true })
  cash?: string;

  @Field(() => String, { description: "driver's wallet", nullable: true })
  wallet?: string;

  @IsNotEmpty()
  @Field(() => Boolean, { description: "driver's status", nullable: true })
  status?: boolean;

  @Field(() => ID, { description: "driver's company", nullable: true })
  company: string;

  @Field(() => ID, { description: "driver's company", nullable: true })
  zone: string;
}
