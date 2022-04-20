import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { UsersResolver } from "./users.resolver";
import { User, UserSchema } from "./entities/users.entity";
import { UsersService } from "./users.service";
import { Roles } from "@fd-wereact/nest-common";
import { registerEnumType } from "@nestjs/graphql";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {
  constructor() {
    registerEnumType(Roles, {
      name: "Roles",
    });
  }
}
