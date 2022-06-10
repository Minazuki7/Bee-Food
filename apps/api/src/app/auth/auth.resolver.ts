import { Args, Resolver, Mutation, Query } from "@nestjs/graphql";

import { AuthService } from "./auth.service";
import { SkipAuth } from "@fd-wereact/nest-common";
import { CurrentUser } from "@fd-wereact/nest-common";
import { AuthArgs } from "./dto/auth.args";
import { AuthDriverArgs } from "./dto/authDriver.args";
import { AuthResult } from "./entities/auth-jwt.entity";
import { User } from "../users/entities/users.entity";
import { UpdateUserInput } from "../users/dto/update-user.input";

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
/*
  @Mutation(() => AuthResult)
  @SkipAuth()
  async ChangePassword(@Args() {id, password}: AuthDriverArgs , updateUserInput: UpdateUserInput) {
    return this.authService.ChangePassword(id, password, updateUserInput);
  }*/
  
  @Mutation(() => User, { name: "changePassword" })
  @SkipAuth()
  async ChangePassword(
    @Args() { phone, password }: AuthDriverArgs,
    @Args("newPassword", { type: () => String }) newPassword: string
  ) {
    return this.authService.ChangePassword(phone, password, newPassword);
  }

  @Query(() => User)
  async whoAmI(@CurrentUser() user: User): Promise<User> {
    return user;
  }
}
