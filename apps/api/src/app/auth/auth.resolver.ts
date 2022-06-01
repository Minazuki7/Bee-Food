import { Args, Resolver, Mutation, Query } from "@nestjs/graphql";

import { AuthService } from "./auth.service";
import { SkipAuth } from "@fd-wereact/nest-common";
import { CurrentUser } from "@fd-wereact/nest-common";
import { AuthArgs } from "./dto/auth.args";
import { AuthDriverArgs } from "./dto/authDriver.args";
import { AuthResult } from "./entities/auth-jwt.entity";
import { User } from "../users/entities/users.entity";

@Resolver("Auth")
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResult)
  @SkipAuth()
  async login(@Args() { email, password }: AuthArgs) {
    return this.authService.login(email, password);
  }


  @Mutation(() => AuthResult)
  @SkipAuth()
  async loginDriver(@Args() { phone, password }: AuthDriverArgs) {
    return this.authService.loginDriver(phone, password);
  }


  @Query(() => User)
  async whoAmI(@CurrentUser() user: User): Promise<User> {
    return user;
  }
}
