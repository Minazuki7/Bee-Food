import { ObjectType, Field } from "@nestjs/graphql";

import { User } from "./../../users/entities/users.entity";

@ObjectType()
export class AuthResult {
  @Field(() => String, { description: "JWT authorization token" })
  token: string;
  @Field(() => String, { description: "JWT authorization refresh token" })
  refreshToken: string;
  @Field(() => User, { description: "logged in user" })
  user: User;
  @Field(() => String)
  expiresIn: string;
}
