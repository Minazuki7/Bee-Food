import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";

import { FranchisesService } from "./franchises.service";
import { Franchise } from "./entities/franchise.entity";
import { CreateFranchiseInput } from "./dto/create-franchise.input";
import { UpdateFranchiseInput } from "./dto/update-franchise.input";

@Resolver(() => Franchise)
export class FranchisesResolver {
  constructor(private readonly franchisesService: FranchisesService) {}

  @Mutation(() => Franchise)
  createFranchise(
    @Args("createFranchiseInput") createFranchiseInput: CreateFranchiseInput
  ) {
    return this.franchisesService.create(createFranchiseInput);
  }

  @Query(() => [Franchise], { name: "franchises" })
  findAll() {
    return this.franchisesService.findAll();
  }

  @Query(() => Franchise, { name: "franchise" })
  findOne(@Args("id", { type: () => String }) id: string) {
    return this.franchisesService.findOne(id);
  }

  @Mutation(() => Franchise)
  updateFranchise(
    @Args("updateFranchiseInput") updateFranchiseInput: UpdateFranchiseInput,
    @Args("id", { type: () => String }) id: string
  ) {
    return this.franchisesService.update(id, updateFranchiseInput);
  }

  @Mutation(() => Franchise)
  removeFranchise(@Args("id", { type: () => String }) id: string) {
    return this.franchisesService.remove(id);
  }
}
