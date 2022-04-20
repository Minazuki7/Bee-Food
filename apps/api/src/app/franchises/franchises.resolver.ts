import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FranchisesService } from './franchises.service';
import { Franchise } from './entities/franchise.entity';
import { CreateFranchiseInput } from './dto/create-franchise.input';
import { UpdateFranchiseInput } from './dto/update-franchise.input';

@Resolver(() => Franchise)
export class FranchisesResolver {
  constructor(private readonly franchisesService: FranchisesService) {}

  @Mutation(() => Franchise)
  createFranchise(@Args('createFranchiseInput') createFranchiseInput: CreateFranchiseInput) {
    return this.franchisesService.create(createFranchiseInput);
  }

  @Query(() => [Franchise], { name: 'franchises' })
  findAll() {
    return this.franchisesService.findAll();
  }

  @Query(() => Franchise, { name: 'franchise' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.franchisesService.findOne(id);
  }

  @Mutation(() => Franchise)
  updateFranchise(@Args('updateFranchiseInput') updateFranchiseInput: UpdateFranchiseInput) {
    return this.franchisesService.update(updateFranchiseInput.id, updateFranchiseInput);
  }

  @Mutation(() => Franchise)
  removeFranchise(@Args('id', { type: () => Int }) id: number) {
    return this.franchisesService.remove(id);
  }
}
