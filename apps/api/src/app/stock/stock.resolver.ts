import { Model } from "mongoose";
import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  ObjectType,
} from "@nestjs/graphql";

import { StockService } from "./stock.service";
import { Stock, StockDocument } from "@fd-wereact/schemas";
import { UpdateStockInput } from "./dto/update-stock.input";
import { CrudResolver, PaginatedList } from "@fd-wereact/nest-common";
import { InjectModel } from "@nestjs/mongoose";

@ObjectType()
export class PaginatedStock extends PaginatedList(Stock) {}
@Resolver(() => Stock)
export class StockResolver extends CrudResolver(Stock, PaginatedStock) {
  constructor(
    private readonly stockService: StockService,
    @InjectModel(Stock.name)
    StockModel: Model<StockDocument>
  ) {
    super(StockModel);
  }

  @Mutation(() => Stock)
  updateStock(
    @Args("updateStockInput") updateStockInput: UpdateStockInput,
    @Args("id", { type: () => String }) id: string
  ) {
    return this.stockService.update(id, updateStockInput);
  }

  @Mutation(() => Stock)
  removeStock(@Args("id", { type: () => ID }) id: string) {
    return this.stockService.remove(id);
  }

  @Query(() => Stock, { name: "stockone" })
  findItem(@Args("itemID", { type: () => ID }) item: string) {
    return this.stockService.findItem(item);
  }
}
