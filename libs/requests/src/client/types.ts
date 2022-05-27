import { Locality } from '../locality';

export interface Client {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  locality: Locality;
}
