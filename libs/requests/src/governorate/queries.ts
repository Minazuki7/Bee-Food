import { QueryHookOptions } from '@apollo/client';
import { useLocalQuery, useLocalLazyQuery } from '../apollo';

import { List, ListVariables, GetVariables } from '../generic';
import { Governorate } from './types';

import { GOVERNORATES_QUERY, GOVERNORATE_USE_QUERY } from './documents';

export const useGovernorates = (
  options?: QueryHookOptions<{ governorates: List<Governorate> }, ListVariables>
) => useLocalQuery(GOVERNORATES_QUERY, options);
export const useLazyGovernorate = (
  options?: QueryHookOptions<{ governorate: Governorate }, GetVariables>
) => useLocalLazyQuery(GOVERNORATE_USE_QUERY, options);
