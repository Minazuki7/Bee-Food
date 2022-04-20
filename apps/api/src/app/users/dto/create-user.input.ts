import { Roles } from "@fd-wereact/nest-common";
import { InputType, Int, Field } from "@nestjs/graphql";

import {
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
  IsString,
  IsArray,
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
  @Field(() => Int, { description: "user's phone number" })
  phone: number;

  @IsArray()
  @IsNotEmpty()
  @Field(() => [Roles], { description: "user's roles" })
  roles: Roles[];
}
