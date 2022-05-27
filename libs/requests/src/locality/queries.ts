import { QueryHookOptions } from '@apollo/client';
import { useLocalQuery, useLocalLazyQuery } from '../apollo';

import { List, ListVariables, GetVariables } from '../generic';
import { Locality } from './types';

import { LOCALITIES_QUERY, LOCALITY_USE_QUERY } from './documents';

export const useLocalities = (
  options?: QueryHookOptions<{ localities: List<Locality> }, ListVariables>
) => useLocalQuery(LOCALITIES_QUERY, options);
export const useLazyLocality = (
  options?: QueryHookOptions<{ locality: Locality }, GetVariables>
) => useLocalLazyQuery(LOCALITY_USE_QUERY, options);
