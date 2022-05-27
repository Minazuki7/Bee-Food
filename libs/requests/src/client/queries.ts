import { QueryHookOptions } from '@apollo/client';
import { useLocalQuery, useLocalLazyQuery } from '../apollo';

import { GetVariables, List, ListVariables } from '../generic';
import { Client } from './types';

import { CLIENTS_QUERY, CLIENT_QUERY } from './documents';

export const useClients = (
  options?: QueryHookOptions<{ clients: List<Client> }, ListVariables>
) => useLocalQuery(CLIENTS_QUERY, options);

export const useLazyClient = (
  options?: QueryHookOptions<{ client: Client }, GetVariables>
) => useLocalLazyQuery(CLIENT_QUERY, options);
