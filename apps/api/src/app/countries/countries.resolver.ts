import { Model } from "mongoose";
import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  ObjectType,
} from "@nestjs/graphql";
import { CountriesService } from "./countries.service";
import { Country, CountryDocument } from "@fd-wereact/schemas";
import { CreateCountryInput } from "./dto/create-country.input";
import { UpdateCountryInput } from "./dto/update-country.input";
import { CrudResolver, PaginatedList } from "@fd-wereact/nest-common";
import { InjectModel } from "@nestjs/mongoose";

@ObjectType()
export class PaginatedCountries extends PaginatedList(Country) {}
@Resolver(() => Country)
export class CountriesResolver extends CrudResolver(
  Country,
  PaginatedCountries
) {
  constructor(
    private readonly countriesService: CountriesService,
    @InjectModel(Country.name)
    countryModel: Model<CountryDocument>
  ) {
    super(countryModel);
  }

  @Mutation(() => Country)
  createCountry(
    @Args("createCountryInput") createCountryInput: CreateCountryInput
  ) {
    return this.countriesService.create(createCountryInput);
  }

  @Mutation(() => Country)
  updateCountry(
    @Args("updateCountryInput") updateCountryInput: UpdateCountryInput,
    @Args("id", { type: () => ID }) id: string
  ) {
    return this.countriesService.update(id, updateCountryInput);
  }
}
