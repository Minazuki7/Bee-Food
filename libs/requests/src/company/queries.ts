import { QueryHookOptions } from "@apollo/client";
import { useLocalQuery, useLocalLazyQuery } from "../apollo";

import { List, ListVariables, GetVariables } from "../generic";
import { Company } from "./types";

import { COMPANIES_QUERY, COMPANY_QUERY } from "./documents";

export const useCompanies = (
  options?: QueryHookOptions<{ findAllCompanys: List<Company> }, ListVariables>
) => useLocalQuery(COMPANIES_QUERY, options);

export const useLazyCompany = (
  options?: QueryHookOptions<{ findCompany: Company }, GetVariables>
) => useLocalLazyQuery(COMPANY_QUERY, options);
