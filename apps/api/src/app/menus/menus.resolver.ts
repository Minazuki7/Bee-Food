import { Model } from "mongoose";
import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  ObjectType,
} from "@nestjs/graphql";

import { MenusService } from "./menus.service";
import { Menu, MenuDocument } from "@fd-wereact/schemas";
import { CreateMenuInput } from "./dto/create-menu.input";
import { UpdateMenuInput } from "./dto/update-menu.input";
import { CrudResolver, PaginatedList } from "@fd-wereact/nest-common";
import { InjectModel } from "@nestjs/mongoose";

@ObjectType()
export class PaginatedMenus extends PaginatedList(Menu) {}
@Resolver(() => Menu)
export class MenusResolver extends CrudResolver(Menu, PaginatedMenus) {
  constructor(
    private readonly menusService: MenusService,
    @InjectModel(Menu.name)
    menuModel: Model<MenuDocument>
  ) {
    super(menuModel);
  }

  @Mutation(() => Menu)
  createMenu(@Args("createMenuInput") createMenuInput: CreateMenuInput) {
    return this.menusService.create(createMenuInput);
  }

  @Mutation(() => Menu)
  updateMenu(
    @Args("updateMenuInput") updateMenuInput: UpdateMenuInput,
    @Args("id", { type: () => String }) id: string
  ) {
    return this.menusService.update(id, updateMenuInput);
  }
  @Query(() => PaginatedMenus)
  findMenuByBranch(@Args("branch", { type: () => ID }) branch: string) {
    const items = this.menusService.findMenu(branch);
    return { data: items };
  }
}
