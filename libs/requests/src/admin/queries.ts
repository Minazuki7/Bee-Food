import { QueryHookOptions } from '@apollo/client';

import { GetVariables, List, ListVariables } from '../generic';

import { useLocalLazyQuery, useLocalQuery } from '../apollo';
import { ADMINS_QUERY, ADMIN_QUERY } from './documents';
import { Admin } from './types';

export const useAdmins = (
  options?: QueryHookOptions<{ admins: List<Admin> }, ListVariables>
) => useLocalQuery(ADMINS_QUERY, options);

export const useLazyAdmin = (
  options?: QueryHookOptions<{ admin: Admin }, GetVariables>
) => useLocalLazyQuery(ADMIN_QUERY, options);
