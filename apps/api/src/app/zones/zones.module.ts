import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { ZonesService } from "./zones.service";
import { ZonesResolver } from "./zones.resolver";
import { Zone, ZoneSchema } from "./entities/zone.entity";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Zone.name, schema: ZoneSchema }]),
  ],
  providers: [ZonesResolver, ZonesService],
})
export class ZonesModule {}
