import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

import { CreateMenuInput } from "./dto/create-menu.input";
import { UpdateMenuInput } from "./dto/update-menu.input";
import { Menu, MenuDocument } from "./entities/menu.entity";

@Injectable()
export class MenusService {
  constructor(
    @InjectModel(Menu.name)
    private menuModel: Model<MenuDocument>
  ) {}
  async create(createMenuInput: CreateMenuInput): Promise<Menu> {
    const createdmenu = new this.menuModel(createMenuInput);
    return createdmenu.save();
  }

  async findAll() {
    return this.menuModel.find().exec();
  }

  async findOne(id: string) {
    return this.menuModel.findById(id).exec();
  }

  async update(id: string, updateMenuInput: UpdateMenuInput) {
    return this.menuModel.findByIdAndUpdate(id, updateMenuInput).exec();
  }

  remove(id: string) {
    return this.menuModel.findByIdAndRemove(id).exec();
  }
}
