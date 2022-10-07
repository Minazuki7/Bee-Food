import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { CompaniesService } from "./companies.service";
import { CompaniesResolver } from "./companies.resolver";
import { Company, CompanySchema } from "@fd-wereact/schemas";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }]),
  ],
  providers: [CompaniesResolver, CompaniesService],
})
export class CompaniesModule {}
