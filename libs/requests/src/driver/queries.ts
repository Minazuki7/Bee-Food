import { QueryHookOptions } from '@apollo/client';
import { useLocalLazyQuery, useLocalQuery } from '../apollo';
import { List, ListVariables } from '../generic';

import { Driver } from './types';
import { DRIVERS_QUERY, DRIVER_QUERY } from './documents';

export const useDrivers = (
  options?: QueryHookOptions<{ drivers: List<Driver> }, ListVariables>
) => useLocalQuery(DRIVERS_QUERY, options);

export const useLazyDriver = (
  options?: QueryHookOptions<{ driver: Driver }, { id: string }>
) => useLocalLazyQuery(DRIVER_QUERY, options);
