import { Item } from "./../items/entities/item.entity";
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
  findById(@Args("id", { type: () => ID }) id: string) {
    return this.stockService.findById(id);
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
  @Mutation(() => Stock)
  updateStockCount(
    @Args("id", { type: () => String }) id: string,
    @Args("iditem", { type: () => String }) idItem: string
  ) {
    return this.stockService.updateCount(id, idItem);
  }

  @Query(() => Stock, { name: "stockone" })
  findItem(@Args("itemID", { type: () => ID }) item: string) {
    return this.stockService.findItem(item);
  }
}
