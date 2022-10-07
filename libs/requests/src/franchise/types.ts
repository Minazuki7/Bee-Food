// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries

export interface Franchise {
  id: string;
  name: string;
  email: string;
  description: string;
}

export interface UpdateFranchiseVariables {
  id: string;
  name?: string;
  description?: string;
  email?: string;
}

export interface CreateFranchiseVariables {
  name: string;
  description: string;
  email: string;
}
