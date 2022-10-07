import { Model } from "mongoose";
import {
  Resolver,
  Query,
  Mutation,
  Args,
  ObjectType,
  ID,
} from "@nestjs/graphql";

import { FranchisesService } from "./franchises.service";
import { Franchise, FranchiseDocument } from "@fd-wereact/schemas";
import { CreateFranchiseInput } from "./dto/create-franchise.input";
import { UpdateFranchiseInput } from "./dto/update-franchise.input";
import { CrudResolver, PaginatedList } from "@fd-wereact/nest-common";
import { InjectModel } from "@nestjs/mongoose";

@ObjectType()
export class PaginatedFranchises extends PaginatedList(Franchise) {}
@Resolver(() => Franchise)
export class FranchisesResolver extends CrudResolver(
  Franchise,
  PaginatedFranchises
) {
  constructor(
    private readonly franchisesService: FranchisesService,
    @InjectModel(Franchise.name)
    franchiseModel: Model<FranchiseDocument>
  ) {
    super(franchiseModel);
  }

  @Mutation(() => Franchise)
  createFranchise(
    @Args("createFranchiseInput") createFranchiseInput: CreateFranchiseInput
  ) {
    return this.franchisesService.create(createFranchiseInput);
  }

  @Mutation(() => Franchise)
  updateFranchise(
    @Args("updateFranchiseInput") updateFranchiseInput: UpdateFranchiseInput,
    @Args("id", { type: () => ID }) id: string
  ) {
    return this.franchisesService.update(id, updateFranchiseInput);
  }
}
