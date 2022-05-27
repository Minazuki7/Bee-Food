import { ListVariables } from '../generic';

export interface City {
  id: string;
  name: string;
  code: string;
  governorate: {
    id: string;
    name: string;
  };
}

export interface CitiesVariables extends ListVariables {
  search?: string;
}

export interface CreateCityVariables {
  name: string;
  code: string;
  governorate: string;
}

export interface UpdateCityVariables {
  id: string;
  name?: string;
  code?: string;
  governorate?: string;
}
