export interface Company {
  id: string;
  name: string;
  phone: string;
  address: string;
  user: string;
}

export interface CreateCompanyVariables {
  name: string;
  phone: string;
  address: string;
  isActive: boolean;
}

export interface UpdateCompanyVariables {
  id: string;
  name?: string;
  phone?: string;
  address?: string;
}
