// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries

import { Branch } from "../branch";
import { Stock } from "../stock";

export interface Item {
  id: string;
  slug: string;
  title: string;
  price: number;
  foodType: string;
  description: string;
  status: boolean;
  branch: Branch;
  stock: number;
}

export interface UpdateItemVariables {
  id: string;
  slug?: string;
  title?: string;
  price?: number;
  foodType?: string;
  description?: string;
  status?: boolean;
  branch?: string;
}

export interface CreateItemVariables {
  slug: string;
  title: string;
  price: number;
  foodType: string;
  description: string;
  status: boolean;
  branch: string;
  stock: number;
}
