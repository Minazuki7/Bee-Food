import { ORDER_STATUS } from "@shared/permission";
import { Branch } from "../branch";
import { Client } from "../client";
import { Company } from "../company";
import { Driver } from "../driver";
import { Item } from "../item";
import { Menu } from "../menu";

export interface Order {
  id: string;
  branch: Branch;
  status: ORDER_STATUS;
  client: Client;
  company: Company;
  driver?: Driver;
  deliveryFees: number;
  price: number;
  totalPrice: number;
  items?: Item[];
  menus?: Menu[];
}

export interface UpdateOrderVariables {
  id: string;
  // branch?: string;
  // status?: ORDER_STATUS;
  // client?: string;
  // company: string;
  // driver?: string;
  // deliveryFees?: number;
  // price?: number;
  // totalPrice?: number;
}

export interface CreateOrderVariables {
  branch: string;
  items?: string[];
  menus?: string[];
}
