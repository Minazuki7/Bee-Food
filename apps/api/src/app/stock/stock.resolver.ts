import { Resolver, Query, Mutation, Args, ID } from "@nestjs/graphql";

import { StockService } from "./stock.service";
import { Stock } from "./entities/stock.entity";
import { CreateStockInput } from "./dto/create-stock.input";
import { UpdateStockInput } from "./dto/update-stock.input";

@Resolver(() => Stock)
export class StockResolver {
  constructor(private readonly stockService: StockService) {}

  @Mutation(() => Stock)
  createStock(@Args("createStockInput") createStockInput: CreateStockInput) {
    return this.stockService.create(createStockInput);
  }

  @Query(() => [Stock], { name: "stocks" })
  findAll() {
    return this.stockService.findAll();
  }

  @Query(() => Stock, { name: "stock" })
  findOne(@Args("id", { type: () => ID }) id: string) {
    return this.stockService.findOne(id);
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
}
