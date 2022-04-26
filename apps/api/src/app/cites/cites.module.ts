import { Module } from "@nestjs/common";
import { CitesService } from "./cites.service";
import { CitesResolver } from "./cites.resolver";
import { MongooseModule } from "@nestjs/mongoose";

import { City, CitySchema } from "./entities/city.entity";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: City.name, schema: CitySchema }]),
  ],
  providers: [CitesResolver, CitesService],
})
export class CitesModule {}
