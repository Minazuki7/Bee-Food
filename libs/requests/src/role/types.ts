import { Permission } from '../auth';
import { ListVariables } from '../generic';

export interface Role {
  id: string;
  name: string;
  permissions: Permission[];
}

export interface RolesVariables extends ListVariables {
  search?: string;
}
export interface CreateRoleVariables {
  name: string;
  permissions: { resource: string; permissions: string[] }[];
}
export interface UpdateRoleVariables {
  id: string;
  name?: string;
  permissions?: { resource: string; permissions: string[] }[];
}
