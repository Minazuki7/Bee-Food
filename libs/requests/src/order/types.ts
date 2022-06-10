import { ORDER_STATUS } from "libs/nest-common/src";

export interface Order {
  id: string;
  branch: string;
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
  branch?: string;
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
  items: string[];
  menu: string[];
}
