import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

import { CreateMenuInput } from "./dto/create-menu.input";
import { UpdateMenuInput } from "./dto/update-menu.input";
import { Menu, MenuDocument } from "@fd-wereact/schemas";

@Injectable()
export class MenusService {
  constructor(
    @InjectModel(Menu.name)
    private menuModel: Model<MenuDocument>
  ) {}
  async create(createMenuInput: CreateMenuInput): Promise<Menu> {
    const createdMenu = new this.menuModel(createMenuInput);

    return createdMenu.save();
  }

  async findAll() {
    return this.menuModel.find().exec();
  }

  async findOne(id: string) {
    return this.menuModel.findById(id).exec();
  }

  async findMenu(branch?: string) {
    return this.menuModel.find({ branch: branch }).populate("items").exec();
  }

  async update(id: string, updateMenuInput: UpdateMenuInput) {
    return this.menuModel.findByIdAndUpdate(id, updateMenuInput).exec();
  }
  async findMany(ids: string[]) {
    return this.menuModel.find({ _id: { $in: ids } }).exec();
  }

  remove(id: string) {
    return this.menuModel.findByIdAndRemove(id).exec();
  }
  async menuPrice(ids: string[]) {
    const findDuplicates = (arr) =>
      arr.filter((menu, index) => arr.indexOf(menu) != index);

    const menuList = await this.findMany(ids);
    const duplicatedElements = findDuplicates(ids);
    const duplicatedMenu = duplicatedElements
      .map((id) => menuList.filter((menu) => menu._id.toString() === id))
      .flat();
    const price = [...menuList, ...duplicatedMenu].reduce(
      (pervPrice, menuList) => pervPrice + menuList.price,
      0
    );

    return price;
  }
  async itemsInMenu(ids: string[]) {
    if (!ids) return [];
    const findDuplicates = (arr) =>
      arr.filter((menu, index) => arr.indexOf(menu) != index);
    const menuList = await this.menuModel
      .find({ _id: { $in: ids } })
      .populate("items");
    const duplicatedElements = findDuplicates(ids);
    const duplicatedMenu = duplicatedElements
      .map((id) => menuList.filter((menu) => menu._id.toString() === id))
      .flat();

    return [...menuList, ...duplicatedMenu]
      .map((menu) => menu.items.map((item) => item.id))
      .flat();
  }
}
