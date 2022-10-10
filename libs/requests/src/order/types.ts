import { ORDER_STATUS } from "@shared/permission";
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
