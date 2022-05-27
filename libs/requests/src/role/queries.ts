import { QueryHookOptions } from '@apollo/client';
import { useLocalQuery, useLocalLazyQuery } from '../apollo';

import { List, GetVariables } from '../generic';
import { Role, RolesVariables } from './types';

import { ROLES_QUERY, ROLE_QUERY } from './documents';

export const useRoles = (
  options?: QueryHookOptions<{ roles: List<Role> }, RolesVariables>
) => useLocalQuery(ROLES_QUERY, options);

export const useLazyRole = (
  options?: QueryHookOptions<{ role: Role }, GetVariables>
) => useLocalLazyQuery(ROLE_QUERY, options);
