import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { Menu, MenuSchema } from "./entities/menu.entity";
import { MenusService } from "./menus.service";
import { MenusResolver } from "./menus.resolver";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Menu.name, schema: MenuSchema }]),
  ],
  providers: [MenusResolver, MenusService],
})
export class MenusModule {}
