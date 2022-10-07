import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { LocationSchema, Location } from "@fd-wereact/schemas";
import { LocationsService } from "./locations.service";
import { LocationsResolver } from "./locations.resolver";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Location.name, schema: LocationSchema },
    ]),
  ],
  providers: [LocationsResolver, LocationsService],
})
export class LocationsModule {}
