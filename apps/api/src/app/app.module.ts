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


@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/nest'),UsersModule, ZonesModule, LocationsModule, ClientsModule, DriversModule, FranchisesModule, BranchesModule, ItemsModule, MenusModule, OrdersModule, OrderDetailsModule, StockModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
