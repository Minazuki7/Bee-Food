import { LazyQueryHookOptions, QueryTuple } from '@apollo/client';
import { graphQLResult } from '@utils/graphql';
import { ComponentType, useEffect, useMemo } from 'react';
import { useMatch, useParams, useResolvedPath } from 'react-router-dom';

import { FormProps, GenericMutation } from './Create';

export type GenericLazyGet<T> = (
  options?: LazyQueryHookOptions<T, { id: string }>
) => QueryTuple<T, { id: string }>;

export type QueryTupleReturnType<T> = T extends QueryTuple<infer R, any>
  ? R
  : never;

interface UpdateProps<
  K extends string,
  V,
  Data,
  Props extends FormProps<V, Data>
> {
  api: GenericMutation<Partial<V> & { id: string }>;
  get: GenericLazyGet<Record<K, Data>>;
  Form: ComponentType<Props>;
  formProps: Omit<Props, keyof FormProps<V, Data>>;
  onDone: () => void;
  onClose: () => void;
}

const Update = <K extends string, V, Data, Props extends FormProps<V, Data>>({
  api: useApi,
  get: useGet,
  Form,
  formProps,
  onDone,
  onClose,
}: UpdateProps<K, V, Data, Props>) => {
  const params = useParams();
  const path = useResolvedPath('.');
  const match = useMatch(`${path.pathname}/update/:id`);
  const [get, getState] = useGet({ fetchPolicy: 'network-only' });
  const [call, updateState] = useApi();

  const id = params.id || match?.params.id;

  useEffect(() => {
    if (id) {
      get({ variables: { id } });
    }
  }, [id, get]);

  const data = useMemo(() => {
    if (!getState.data) return undefined;
    return graphQLResult(getState.data);
  }, [getState.data]);

  useEffect(() => {
    if (updateState.data) {
      onDone();
    }
  }, [updateState.data, onDone]);

  return (
    <Form
      {...(formProps as Props)}
      onClose={onClose}
      item={data}
      loading={updateState.loading || getState.loading}
      error={updateState.error}
      onSubmit={(values) => {
        if (id) call({ variables: { id, ...values } });
      }}
    />
  );
};

export default Update;
