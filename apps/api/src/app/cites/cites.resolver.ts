import { Resolver, Query, Mutation, Args, ID } from "@nestjs/graphql";
import { CitesService } from "./cites.service";
import { City } from "./entities/city.entity";
import { CreateCityInput } from "./dto/create-city.input";
import { UpdateCityInput } from "./dto/update-city.input";

@Resolver(() => City)
export class CitesResolver {
  constructor(private readonly citesService: CitesService) {}

  @Mutation(() => City)
  createCity(@Args("createCityInput") createCityInput: CreateCityInput) {
    return this.citesService.create(createCityInput);
  }

  @Query(() => [City], { name: "cites" })
  findAll() {
    return this.citesService.findAll();
  }

  @Query(() => City, { name: "cite" })
  findOne(@Args("id", { type: () => ID }) id: string) {
    return this.citesService.findOne(id);
  }

  @Mutation(() => City)
  updateCity(
    @Args("updateCityInput") updateCityInput: UpdateCityInput,
    @Args("id", { type: () => String }) id: string
  ) {
    return this.citesService.update(id, updateCityInput);
  }

  @Mutation(() => City)
  removeCity(@Args("id", { type: () => ID }) id: string) {
    return this.citesService.remove(id);
  }
}
