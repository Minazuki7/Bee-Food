import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ROLES } from "@fd-wereact/schemas";
import { registerEnumType } from "@nestjs/graphql";

import { UsersResolver } from "./users.resolver";
import { User, UserSchema } from "@fd-wereact/schemas";
import { UsersService } from "./users.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {
  constructor() {
    registerEnumType(ROLES, {
      name: "ROLES",
    });
  }
}
