import { PaginatedList } from "@fd-wereact/nest-common";
//import { Model } from "mongoose";
import {
  Resolver,
  Query,
  Mutation,
  Args,
  ObjectType,
  ID,
} from "@nestjs/graphql";
import { BranchesService } from "./branches.service";
import { Model } from "mongoose";
import { Branch, BranchDocument } from "@fd-wereact/schemas";
import { CreateBranchInput } from "./dto/create-branch.input";
import { UpdateBranchInput } from "./dto/update-branch.input";
import { CrudResolver } from "@fd-wereact/nest-common";
import { InjectModel } from "@nestjs/mongoose";

@ObjectType()
export class PaginatedBranches extends PaginatedList(Branch) {}
@Resolver(() => Branch)
export class BranchesResolver extends CrudResolver(Branch, PaginatedBranches) {
  constructor(
    private readonly branchesService: BranchesService,
    @InjectModel(Branch.name)
    branchModel: Model<BranchDocument>
  ) {
    super(branchModel);
  }

  @Mutation(() => Branch)
  createBranch(
    @Args("createBranchInput") createBranchInput: CreateBranchInput
  ) {
    return this.branchesService.create(createBranchInput);
  }

  @Mutation(() => Branch)
  updateBranch(
    @Args("updateBranchInput") updateBranchInput: UpdateBranchInput,
    @Args("id", { type: () => String }) id: string
  ) {
    return this.branchesService.update(id, updateBranchInput);
  }
  @Query(() => PaginatedBranches)
  findBranchByZone(@Args("zone", { type: () => ID }) zone: string) {
    const branch = this.branchesService.findByZone(zone);
    return { data: branch };
  }
}
