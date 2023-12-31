import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { Franchise, FranchiseSchema } from "@fd-wereact/schemas";
import { FranchisesService } from "./franchises.service";
import { FranchisesResolver } from "./franchises.resolver";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Franchise.name, schema: FranchiseSchema },
    ]),
  ],
  providers: [FranchisesResolver, FranchisesService],
})
export class FranchisesModule {}
