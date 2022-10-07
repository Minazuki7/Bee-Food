import { UsersModule } from "./../users/users.module";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { ClientsService } from "./clients.service";
import { ClientsResolver } from "./clients.resolver";
import { Client, ClientSchema } from "@fd-wereact/schemas";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Client.name, schema: ClientSchema }]),
    UsersModule,
  ],
  providers: [ClientsResolver, ClientsService],
})
export class ClientsModule {}
