export interface List<T> {
  page: number;
  perPage: number;
  count: number;
  totalPages: number;
  data: T[];
}

export interface ListVariables {
  page?: number;
  perPage?: number;
  sort?: string;
  order?: 1 | -1;
}

export interface DeleteVariables {
  id?: string;
  ids?: string[];
}

export interface GetVariables {
  id: string;
}
