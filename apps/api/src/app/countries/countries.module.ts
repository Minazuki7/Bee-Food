import { MongooseModule } from "@nestjs/mongoose";
import { Module } from "@nestjs/common";

import { CountriesService } from "./countries.service";
import { Country, CountrySchema } from "./entities/country.entity";
import { CountriesResolver } from "./countries.resolver";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Country.name, schema: CountrySchema }]),
  ],
  providers: [CountriesResolver, CountriesService],
})
export class CountriesModule {}
