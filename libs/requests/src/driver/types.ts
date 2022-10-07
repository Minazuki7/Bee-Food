//import { Truck } from '../truck/types';

import { Company } from "../company";
import { Zone } from "../zone";

export interface Driver {
  id: string;
  firstName: string;
  lastName: string;
  wallet: number;
  phone: string;
  cash: number;
  status: boolean;
  email: string;
  password: string;
  company: Company;
  zone: Zone;
}

export interface UpdateDriverVariables {
  id: string;
  firstName?: string;
  lastName?: string;
  wallet?: number;
  phone?: string;
  status?: boolean;
  cash?: number;
  email?: string;
  password?: string;
  company?: string;
  zone?: string;
}

export interface CreateDriverVariables {
  company: string;
  firstName: string;
  lastName: string;

  phone: string;

  zone: string;
  email: string;
  password: string;
}
