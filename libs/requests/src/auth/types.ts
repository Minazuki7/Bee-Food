import { RESOURCE, PERMISSION_TYPE } from "@shared/permission";
import { User } from "../user/types";

export interface Permission {
  resource: RESOURCE;
  permissions: PERMISSION_TYPE[];
}

// export interface Token {
//   token: string;
//   refreshToken: string;
//   expiresIn: string;
// }

export interface Auth {
  user: User;
  token: string;
  refreshToken: string;
  expiresIn: string;
}

export interface LoginVariables {
  email: string;
  password: string;
}

export interface RegisterVariables {
  email: string;
  password: string;
  phone: string;
  username: string;
  type: string;
  company: string;
}

export interface LogoutVariables {
  refreshToken: string;
}

export interface ForgotVariables {
  email: string;
}

export interface ResetVariables {
  password: string;
  token: string;
  user: string;
}
