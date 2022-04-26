import { ID } from "@nestjs/graphql";
import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { ItemsService } from "./items.service";
import { Item } from "./entities/item.entity";
import { CreateItemInput } from "./dto/create-item.input";
import { UpdateItemInput } from "./dto/update-item.input";

@Resolver(() => Item)
export class ItemsResolver {
  constructor(private readonly itemsService: ItemsService) {}

  @Mutation(() => Item)
  createItem(@Args("createItemInput") createItemInput: CreateItemInput) {
    return this.itemsService.create(createItemInput);
  }

  @Query(() => [Item], { name: "items" })
  findAll() {
    return this.itemsService.findAll();
  }

  @Query(() => Item, { name: "item" })
  findOne(@Args("id", { type: () => ID }) id: string) {
    return this.itemsService.findOne(id);
  }

  @Mutation(() => Item)
  updateItem(
    @Args("updateItemInput") updateItemInput: UpdateItemInput,
    @Args("id", { type: () => String }) id: string
  ) {
    return this.itemsService.update(id, updateItemInput);
  }

  @Mutation(() => Item)
  removeItem(@Args("id", { type: () => ID }) id: string) {
    return this.itemsService.remove(id);
  }
}
