import { ROLES } from "@fd-wereact/schemas";
import { InputType, Field } from "@nestjs/graphql";

import {
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
  IsString,
  IsBoolean,
} from "class-validator";

@InputType()
export class CreateUserInput {
  @IsEmail()
  @Field(() => String, { description: "user's email" })
  email: string;

  @IsNotEmpty()
  @Field(() => String, { description: "user's name" })
  firstName: string;

  @IsNotEmpty()
  @Field(() => String, { description: "user's last name" })
  lastName: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  /*@Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak'
  })*/
  @Field(() => String, { description: "user's password" })
  password: string;

  @IsNotEmpty()
  @Field(() => String, { description: "user's phone number" })
  phone: string;

  @IsNotEmpty()
  @Field(() => ROLES, { description: "user's role" })
  role: ROLES;
  @IsBoolean()
  @Field(() => Boolean, { description: "user's status", nullable: true })
  isActive?: boolean;
}
