import { Model } from "mongoose";
import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  ObjectType,
} from "@nestjs/graphql";
import { CitesService } from "./cites.service";
import { City, CityDocument, ListCites } from "@fd-wereact/schemas";
import { CreateCityInput } from "./dto/create-city.input";
import { UpdateCityInput } from "./dto/update-city.input";
import { CrudResolver, PaginatedList } from "@fd-wereact/nest-common";
import { InjectModel } from "@nestjs/mongoose";

@ObjectType()
export class PaginatedCites extends PaginatedList(City) {}
@Resolver(() => City)
export class CitesResolver extends CrudResolver(City, PaginatedCites) {
  constructor(
    private readonly citesService: CitesService,
    @InjectModel(City.name) cityModel: Model<CityDocument>
  ) {
    super(cityModel);
  }

  @Mutation(() => City)
  createCity(@Args("createCityInput") createCityInput: CreateCityInput) {
    return this.citesService.create(createCityInput);
  }

  @Mutation(() => City)
  updateCity(
    @Args("updateCityInput") updateCityInput: UpdateCityInput,
    @Args("id", { type: () => ID }) id: string
  ) {
    return this.citesService.update(id, updateCityInput);
  }
}
