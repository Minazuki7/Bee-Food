export interface Governorate {
  id: string;
  name: string;
}

export interface CreateGovernorateVariables {
  name: string;
}

export interface UpdateGovernorateVariables {
  id: string;
  name?: string;
}
