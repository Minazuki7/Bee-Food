// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries

import { Company } from "../company";
import { Franchise } from "../franchise";
import { Zone } from "../zone";

export interface Branch {
  id: string;
  name: string;
  status: boolean;
  description: string;
  openAt: string;
  company: Company;
  closeAt: string;
  franchise: Franchise;
  zone: Zone;
}

export interface UpdateBranchVariables {
  id: string;
  name?: string;
  status?: boolean;
  description?: string;
  openAt?: string;
  company?: string;
  closeAt?: string;
  franchise?: string;
  zone?: string;
}

export interface CreateBranchVariables {
  name: string;
  status: boolean;
  description: string;
  openAt: string;
  company: string;
  closeAt: string;
  franchise: string;
  zone: string;
}
