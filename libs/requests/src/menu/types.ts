// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries

import { Branch } from "../branch";

export interface Menu {
  id: string;
  name: string;
  price: number;
  description: string;
  status: boolean;
  items: string[];
  branch: Branch;
}

export interface UpdateMenuVariables {
  id: string;
  name: string;
  price: number;
  description: string;
  status: boolean;
  items: string[];
  branch?: string;
}

export interface CreateMenuVariables {
  name: string;
  price: number;
  description: string;
  status: boolean;
  items: string[];
  branch: string;
}
