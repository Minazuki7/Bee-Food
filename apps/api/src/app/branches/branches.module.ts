import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { Branch, BranchSchema } from "@fd-wereact/schemas";
import { BranchesService } from "./branches.service";
import { BranchesResolver } from "./branches.resolver";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Branch.name, schema: BranchSchema }]),
  ],
  providers: [BranchesResolver, BranchesService],
  exports: [BranchesService],
})
export class BranchesModule {}
