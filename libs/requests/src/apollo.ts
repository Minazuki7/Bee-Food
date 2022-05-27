/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useMutation,
  useQuery,
  MutationHookOptions,
  QueryHookOptions,
  useLazyQuery,
  LazyQueryHookOptions,
  MutationTuple,
  OperationVariables,
} from '@apollo/client';

import { DocumentNode } from 'graphql';

export function useLocalMutation<T = any, V = OperationVariables>(
  mutation: DocumentNode,
  options?: MutationHookOptions<T, V>
): MutationTuple<T, V> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  return useMutation(mutation, options);
}

export function useLocalQuery<T = any, V = OperationVariables>(
  query: DocumentNode,
  options: QueryHookOptions<T, V> = {}
) {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  return useQuery(query, { onError: () => {}, ...options });
}

export function useLocalLazyQuery<T = any, V = OperationVariables>(
  query: DocumentNode,
  options: LazyQueryHookOptions<T, V> = {}
) {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  return useLazyQuery(query, { onError: () => {}, ...options });
}
