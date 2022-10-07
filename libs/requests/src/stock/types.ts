// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries

import { Item } from "../item";

export interface Stock {
  id: string;
  intial: number;
  rest: number;
  items: Item[];
}

export interface UpdateStockVariables {
  id: string;
  intial?: number;
  rest?: number;
  items?: Item[];
}

export interface CreateStockVariables {
  intial: number;
  rest: number;
  items: Item[];
}
