import { ROLE } from "@shared/permission";
import { RESOURCE, PERMISSION_TYPE } from "@shared/permission";

export interface Permission {
  resource: RESOURCE;
  permissions: PERMISSION_TYPE[];
}

export interface User {
  id: string;
  //username: string;
  role: ROLE;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  isActive: boolean;
  password: string;
  extraFields?: {
    id: string;
    firstName: string;
    lastName: string;
    phone: string;
    confirmed: boolean;
    accepted: boolean;
  };
  permissions: Permission[];
}

export interface InitializeVariables {
  type: string;
  ref: string;
  email: string;
}

export interface CreateUserVariables {
  token: string;
  ref: string;
  username: string;
  password: string;
  type: string;
}
