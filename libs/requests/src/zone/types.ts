import { City } from "../city";
import { Driver } from "../driver/types";

export interface Zone {
  id: string;
  name: string;
  raduis: number;
  city: City;
}

export interface CreateZoneVariables {
  name: string;
  raduis: number;
  city: string;
}

export interface UpdateZoneVariables {
  id: string;
  name?: string;
  raduis?: number;
  city?: string;
}
