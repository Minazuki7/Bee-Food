import { Country } from "../country";
import { ListVariables } from "../generic";

export interface City {
  id: string;
  name: string;
  country: Country;
}

export interface CitiesVariables extends ListVariables {
  search?: string;
}

export interface CreateCityVariables {
  name: string;
  country: string;
}

export interface UpdateCityVariables {
  id: string;
  name?: string;
  country?: string;
}
