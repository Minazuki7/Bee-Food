import { Permission } from '../auth/types';

export interface AdminRole {
  id: string;
  name: string;
}

export interface Admin {
  id: string;
  firstName: string;
  lastName: string;
  address?: string;
  company: string;
  roles: AdminRole[];
  accessibility: Permission[];
}

export interface CreateAdminVariables {
  firstName: string;
  lastName: string;
  address?: string;
  roles: string[];
  accessibility: { resource: string; permissions: string[] }[];
}

export interface UpdateAdminVariables {
  id: string;
  name?: string;
  permissions?: { resource: string; permissions: string[] }[];
}
