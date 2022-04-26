import { Resolver, Query, Mutation, Args, ID } from "@nestjs/graphql";
import { CountriesService } from "./countries.service";
import { Country } from "./entities/country.entity";
import { CreateCountryInput } from "./dto/create-country.input";
import { UpdateCountryInput } from "./dto/update-country.input";

@Resolver(() => Country)
export class CountriesResolver {
  constructor(private readonly countriesService: CountriesService) {}

  @Mutation(() => Country)
  createCountry(
    @Args("createCountryInput") createCountryInput: CreateCountryInput
  ) {
    return this.countriesService.create(createCountryInput);
  }

  @Query(() => [Country], { name: "countries" })
  findAll() {
    return this.countriesService.findAll();
  }

  @Query(() => Country, { name: "country" })
  findOne(@Args("id", { type: () => ID }) id: string) {
    return this.countriesService.findOne(id);
  }

  @Mutation(() => Country)
  updateCountry(
    @Args("updateCountryInput") updateCountryInput: UpdateCountryInput,
    @Args("id", { type: () => String }) id: string
  ) {
    return this.countriesService.update(id, updateCountryInput);
  }

  @Mutation(() => Country)
  removeCountry(@Args("id", { type: () => ID }) id: string) {
    return this.countriesService.remove(id);
  }
}
