import { Governorate } from '../governorate';

export interface Locality {
  id: string;
  name: string;
  code: string;
  city: {
    name: string;
    code: string;
    governorate: Governorate;
  };
}

export interface CreateLocalityVariables {
  name: string;
  code: string;
  city: string;
}
export interface UpdateLocalityVariables {
  id: string;
  name?: string;
  code?: string;
  city?: string;
}
