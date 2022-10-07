import { MutationHookOptions, QueryHookOptions } from "@apollo/client";
import { useLocalQuery, useLocalMutation } from "../apollo";
import { Auth } from "../auth";

import { GetVariables } from "../generic";
import {
  INITIALIZE_MUTATION,
  CREATE_USER_MUTATION,
  FIND_USER_QUERY,
} from "./documents";

import { InitializeVariables, CreateUserVariables, User } from "./types";

export const useInitialize = (
  options?: MutationHookOptions<{ initialize: string }, InitializeVariables>
) => useLocalMutation(INITIALIZE_MUTATION, options);

export const useCreateUser = (
  options?: MutationHookOptions<{ createUser: Auth }, CreateUserVariables>
) => useLocalMutation(CREATE_USER_MUTATION, options);

export const useLazyUser = (
  options?: QueryHookOptions<{ findUser: User }, GetVariables>
) => useLocalQuery(FIND_USER_QUERY, options);
