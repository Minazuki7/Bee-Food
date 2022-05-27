import { QueryHookOptions } from '@apollo/client';
import { useLocalQuery, useLocalLazyQuery } from '../apollo';

import { GetVariables, List } from '../generic';
import { City, CitiesVariables } from './types';

import { CITIES_QUERY, CITY_QUERY } from './documents';

export const useCities = (
  options?: QueryHookOptions<{ cities: List<City> }, CitiesVariables>
) => useLocalQuery(CITIES_QUERY, options);

export const useLazyCity = (
  options?: QueryHookOptions<{ city: City }, GetVariables>
) => useLocalLazyQuery(CITY_QUERY, options);
