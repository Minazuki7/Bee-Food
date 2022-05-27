import { QueryHookOptions } from '@apollo/client';
import { useLocalQuery, useLocalLazyQuery } from '../apollo';

import { List, ListVariables, GetVariables } from '../generic';
import { Company } from './types';

import { COMPANIES_QUERY, COMPANY_QUERY } from './documents';

export const useCompanies = (
  options?: QueryHookOptions<{ companies: List<Company> }, ListVariables>
) => useLocalQuery(COMPANIES_QUERY, options);

export const useLazyCompanies = (
  options?: QueryHookOptions<{ drivers: List<Company> }, ListVariables>
) => useLocalLazyQuery(COMPANIES_QUERY, options);

export const useLazyCompany = (
  options?: QueryHookOptions<{ company: Company }, GetVariables>
) => useLocalLazyQuery(COMPANY_QUERY, options);
