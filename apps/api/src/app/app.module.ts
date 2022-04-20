<<<<<<< apps/api/src/app/app.module.ts
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { join } from "path";
=======
import { UsersModule } from './users/users.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ZonesModule } from './zones/zones.module';
import { LocationsModule } from './locations/locations.module';
import { ClientsModule } from './clients/clients.module';
import { DriversModule } from './drivers/drivers.module';
import { FranchisesModule } from './franchises/franchises.module';
import { BranchesModule } from './branches/branches.module';
import { ItemsModule } from './items/items.module';
import { MenusModule } from './menus/menus.module';
import { OrdersModule } from './orders/orders.module';
import { OrderDetailsModule } from './order-details/order-details.module';
import { StockModule } from './stock/stock.module';

>>>>>>> apps/api/src/app/app.module.ts

import { RolesGuard, GqlJwtAuthGuard } from "@fd-wereact/nest-common";
import { UsersModule } from "./users/users.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_URI), GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "apps/api/src/schema.gql"),
    }),  ConfigModule.forRoot(),UsersModule, AuthModule, ZonesModule, LocationsModule, ClientsModule, DriversModule, FranchisesModule, BranchesModule, ItemsModule, MenusModule, OrdersModule, OrderDetailsModule, StockModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: GqlJwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
