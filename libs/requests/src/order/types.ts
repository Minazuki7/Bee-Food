// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ORDER_STATUS } from "libs/nest-common/src";
import { Branch } from "../branch";

export interface Order {
  id: string;
  branch: Branch;
  status: ORDER_STATUS;
  client: string;
  company: string;
  driver?: string;
  deliveryFees: number;
  price: number;
  totalPrice: number;
}

export interface UpdateOrderVariables {
  id: string;
  branch?: Branch;
  status?: ORDER_STATUS;
  client?: string;
  company: string;
  driver?: string;
  deliveryFees?: number;
  price?: number;
  totalPrice?: number;
}

export interface CreateOrderVariables {
  branch: string;
  items?: string[];
  menus?: string[];
}
