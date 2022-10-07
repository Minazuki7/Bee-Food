import { Locality } from "../locality";

export interface Client {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  status: boolean;
}

export interface UpdateClientVariables {
  id: string;
  firstName?: string;
  lastName?: string;

  phone?: string;
  status?: boolean;

  email?: string;
  password?: string;
}

export interface CreateClientVariables {
  firstName: string;
  lastName: string;

  phone: string;

  email: string;
  password: string;
}
