export * from "./franchises";
export * from "./companies";
export * from "./branches";
export * from "./categories";
export * from "./cites";
export * from "./clients";
export * from "./countries";
export * from "./drivers";
export * from "./items";
export * from "./locations";
export * from "./menus";
export * from "./order-details";
export * from "./orders";
export * from "./stocks";
export * from "./users";
export * from "./zones";
export * from "../enums/index";

import { FranchiseSchema } from "./franchises";
import { CompanySchema } from "./companies";
import { BranchSchema } from "./branches";
import { CategorySchema } from "./categories";
import { CitySchema } from "./cites";
import { ClientSchema } from "./clients";
import { CountrySchema } from "./countries";
import { DriverSchema } from "./drivers";
import { ItemSchema } from "./items";
import { LocationSchema } from "./locations";
import { MenuSchema } from "./menus";
import { OrderDetailSchema } from "./order-details";
import { OrderSchema } from "./orders";
import { StockSchema } from "./stocks";
import { UserSchema } from "./users";
import { ZoneSchema } from "./zones";

export const schemas = {
  Franchise: FranchiseSchema,
  Company: CompanySchema,
  Branch: BranchSchema,
  Category: CategorySchema,
  City: CitySchema,
  Client: ClientSchema,
  Country: CountrySchema,
  Driver: DriverSchema,
  Item: ItemSchema,
  Location: LocationSchema,
  Menu: MenuSchema,
  OrderDetail: OrderDetailSchema,
  Order: OrderSchema,
  Stock: StockSchema,
  User: UserSchema,
  Zone: ZoneSchema,
};
