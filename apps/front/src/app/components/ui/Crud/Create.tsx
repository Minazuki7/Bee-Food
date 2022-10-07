import {
  ApolloError,
  MutationHookOptions,
  MutationTuple,
} from "@apollo/client";
import { ComponentType, useEffect } from "react";

export type MutationParams<T> = T extends (
  ...args: any[]
) => MutationTuple<any, infer R>
  ? R
  : never;

export interface FormProps<V, I> {
  error?: ApolloError;
  onSubmit: (values: V) => void;
  onClose: () => void;
  loading?: boolean;
  item?: I;
}

export type GenericMutation<V = unknown> = (
  options?: MutationHookOptions<any, V>
) => MutationTuple<any, V>;

interface CreateProps<V, Props extends FormProps<V, null>> {
  api: GenericMutation<V>;
  Form: ComponentType<Props>;
  formProps: Omit<Props, keyof FormProps<V, null>>;
  onDone: () => void;
  onClose: () => void;
}

const Create = <V, Props extends FormProps<V, null>>({
  api: useApi,
  Form,
  formProps,
  onDone,
  onClose,
}: CreateProps<V, Props>) => {
  const [call, { data, loading, error }] = useApi();

  useEffect(() => {
    if (data) {
      onDone();
    }
  }, [data, onDone]);

  return (
    <Form
      {...(formProps as Props)}
      onClose={onClose}
      loading={loading}
      error={error}
      onSubmit={(values) => {
        call({ variables: values });
      }}
    />
  );
};

export default Create;
