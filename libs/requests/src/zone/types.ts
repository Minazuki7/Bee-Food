import { City } from '../city';
import { Driver } from '../driver/types';

export interface Zone {
  id: string;
  deposit: {
    id: string;
    name: string;
  };
  name: string;
  code: string;
  days: string[];
  drivers: { type: string; driver: Driver }[];
  cities: City[];
}

export interface CreateZoneVariables {
  deposit: string;
  code: string;
  name: string;
  drivers: { type: string; driver: string }[];
  days: string[];
  cities: string[];
}

export interface UpdateZoneVariables {
  id: string;
  deposit?: string;
  code?: string;
  name?: string;
  drivers?: { type: string; driver: string }[];
  days?: string[];
  cities?: string[];
}
