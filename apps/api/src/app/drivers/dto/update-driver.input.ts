import { CreateDriverInput } from "./create-driver.input";
import { InputType, Field, PartialType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty } from "class-validator";

@InputType()
export class UpdateDriverInput extends PartialType(CreateDriverInput) {
  @IsEmail()
  @Field(() => String, { description: "driver's email" , nullable: true})
  email?: string;

  @IsNotEmpty()
  @Field(() => String, { description: "driver's name" , nullable: true})
  firstName?: string;

  @IsNotEmpty()
  @Field(() => String, { description: "driver's last name" , nullable: true})
  lastName?: string;

  @IsNotEmpty()
  @Field(() => String, { description: "driver's phone number" , nullable: true})
  phone?: string;
  
  @IsNotEmpty()
  @Field(() => String, { description: "driver's cash" , nullable: true})
  cash?: string;

  @IsNotEmpty()
  @Field(() => String, { description: "driver's wallet" , nullable: true})
  wallet?: string;

  @IsNotEmpty()
  @Field(() => Boolean, { description: "driver's status" , nullable: true})
  status?: boolean;
}
