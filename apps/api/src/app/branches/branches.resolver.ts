import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BranchesService } from './branches.service';
import { Branch } from './entities/branch.entity';
import { CreateBranchInput } from './dto/create-branch.input';
import { UpdateBranchInput } from './dto/update-branch.input';

@Resolver(() => Branch)
export class BranchesResolver {
  constructor(private readonly branchesService: BranchesService) {}

  @Mutation(() => Branch)
  createBranch(@Args('createBranchInput') createBranchInput: CreateBranchInput) {
    return this.branchesService.create(createBranchInput);
  }

  @Query(() => [Branch], { name: 'branches' })
  findAll() {
    return this.branchesService.findAll();
  }

  @Query(() => Branch, { name: 'branch' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.branchesService.findOne(id);
  }

  @Mutation(() => Branch)
  updateBranch(@Args('updateBranchInput') updateBranchInput: UpdateBranchInput) {
    return this.branchesService.update(updateBranchInput.id, updateBranchInput);
  }

  @Mutation(() => Branch)
  removeBranch(@Args('id', { type: () => Int }) id: number) {
    return this.branchesService.remove(id);
  }
}
