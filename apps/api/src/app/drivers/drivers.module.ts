import { UsersModule } from "./../users/users.module";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { DriversService } from "./drivers.service";
import { DriversResolver } from "./drivers.resolver";
import { Driver, DriverSchema } from "@fd-wereact/schemas";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Driver.name, schema: DriverSchema }]),
    UsersModule,
  ],
  providers: [DriversResolver, DriversService],
})
export class DriversModule {}
