//import { Truck } from '../truck/types';

export interface Country {
  id: string;
  name: string;
  long: number;
  lat: number;
}

export interface UpdateCountryVariables {
  id: string;
  name?: string;
}

export interface CreateCountryVariables {
  name: string;
}
