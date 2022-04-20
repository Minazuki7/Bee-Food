import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import {
  RefreshToken,
  RefreshTokenSchema,
} from "./entities/refresh-token.entity";
import { RefreshTokensService } from "./refresh-tokens.service";
import { RefreshTokensResolver } from "./refresh-tokens.resolver";
import { UsersModule } from "../users/users.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RefreshToken.name, schema: RefreshTokenSchema },
    ]),
    UsersModule,
  ],
  providers: [RefreshTokensResolver, RefreshTokensService],
  exports: [RefreshTokensService],
})
export class RefreshTokensModule {}
