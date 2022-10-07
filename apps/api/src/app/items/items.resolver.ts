import { Model } from "mongoose";
import { ID, ObjectType } from "@nestjs/graphql";
import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { ItemsService } from "./items.service";
import { Item, ItemDocument } from "@fd-wereact/schemas";
import { CreateItemInput } from "./dto/create-item.input";
import { UpdateItemInput } from "./dto/update-item.input";
import { CrudResolver, PaginatedList } from "@fd-wereact/nest-common";
import { InjectModel } from "@nestjs/mongoose";

@ObjectType()
export class PaginatedItems extends PaginatedList(Item) {}
@Resolver(() => Item)
export class ItemsResolver extends CrudResolver(Item, PaginatedItems) {
  constructor(
    private readonly itemsService: ItemsService,
    @InjectModel(Item.name)
    itemModel: Model<ItemDocument>
  ) {
    super(itemModel);
  }

  @Mutation(() => Item)
  createItem(
    @Args("createItemInput") createItemInput: CreateItemInput,
    @Args("stock") stock: number
  ) {
    return this.itemsService.create(createItemInput, stock);
  }

  @Mutation(() => Item)
  updateItem(
    @Args("updateItemInput") updateItemInput: UpdateItemInput,
    @Args("id", { type: () => String }) id: string
  ) {
    return this.itemsService.update(id, updateItemInput);
  }
  @Query(() => PaginatedItems)
  findItemByBranch(@Args("branch", { type: () => ID }) branch: string) {
    const items = this.itemsService.findItems(branch);
    return { data: items };
  }
}
