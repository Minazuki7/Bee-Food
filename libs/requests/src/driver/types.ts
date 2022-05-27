import { Truck } from '../truck/types';

export interface Driver {
  id: string;
  code: string;
  firstName: string;
  lastName: string;
  address: string;
  phone: string[];
  truck: Truck;
  city: string;
  transportMode: string;
  profitMargin: string;
  ratePackage: string;
}

export interface UpdateDriverVariables {
  id: string;
  code?: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  phone?: string[];
  truck?: string;
  city?: string;
  transportMode?: string;
  profitMargin?: string;
  ratePackage?: string;
}

export interface CreateDriverVariables {
  code: string;
  firstName: string;
  lastName: string;
  address: string;
  phone: string[];
  truck: string;
  city: string;
  transportMode: string;
  profitMargin: string;
  ratePackage: string;
}
