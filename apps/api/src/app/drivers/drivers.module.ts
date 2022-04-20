import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { DriversService } from "./drivers.service";
import { DriversResolver } from "./drivers.resolver";
import { Driver, DriverSchema } from "./entities/driver.entity";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Driver.name, schema: DriverSchema }]),
  ],
  providers: [DriversResolver, DriversService],
})
export class DriversModule {}
