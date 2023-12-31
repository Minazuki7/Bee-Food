import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { Menu, MenuSchema } from "@fd-wereact/schemas";
import { MenusService } from "./menus.service";
import { MenusResolver } from "./menus.resolver";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Menu.name, schema: MenuSchema }]),
  ],
  providers: [MenusResolver, MenusService],
  exports: [MenusService],
})
export class MenusModule {}
