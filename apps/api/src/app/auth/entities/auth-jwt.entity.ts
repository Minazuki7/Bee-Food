import { ObjectType, Field } from "@nestjs/graphql";

import { User } from "@fd-wereact/schemas";

@ObjectType()
export class AuthResult {
  @Field(() => String, { description: "JWT authorization token" })
  token: string;
  @Field(() => String, {
    description: "JWT authorization refresh token",
    nullable: true,
  })
  refreshToken: string;
  @Field(() => User, { description: "logged in user" })
  user: User;
  @Field(() => String)
  expiresIn: string;
}
