import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { CategoriesService } from "./categories.service";
import { CategoriesResolver } from "./categories.resolver";
import { Category, CategorySchema } from "@fd-wereact/schemas";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  providers: [CategoriesResolver, CategoriesService],
})
export class CategoriesModule {}
