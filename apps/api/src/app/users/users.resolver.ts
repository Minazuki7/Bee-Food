import { Model } from "mongoose";
import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  ObjectType,
} from "@nestjs/graphql";
import { CrudResolver, PaginatedList, SkipAuth } from "@fd-wereact/nest-common";

import { UsersService } from "./users.service";
import { User, UserDocument } from "@fd-wereact/schemas";
import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-user.input";
import { InjectModel } from "@nestjs/mongoose";

@ObjectType()
export class PaginatedUsers extends PaginatedList(User) {}
@Resolver(() => User)
export class UsersResolver extends CrudResolver(User, PaginatedUsers) {
  constructor(
    private readonly usersService: UsersService,
    @InjectModel(User.name)
    userModel: Model<UserDocument>
  ) {
    super(userModel);
  }

  @SkipAuth()
  @Mutation(() => User)
  createUser(@Args("createUserInput") createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Mutation(() => User)
  updateUser(
    @Args("updateUserInput") updateUserInput: UpdateUserInput,
    @Args("id", { type: () => ID }) id: string
  ) {
    return this.usersService.update(id, updateUserInput);
  }

  @Mutation(() => User)
  displayDriver(@Args("id", { type: () => ID }) id: string) {
    return this.usersService.displayDriver(id);
  }
}
