export interface Company {
  id: string;
  name: string;
  email: string;
  description: string;
  deliveryFee: number;
}

export interface CreateCompanyVariables {
  name: string;
  email: string;
  description: string;
  deliveryFee: number;
}

export interface UpdateCompanyVariables {
  id: string;
  name?: string;
  description?: string;
  deliveryFee?: number;
  email?: string;
}
