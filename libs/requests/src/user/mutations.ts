import { MutationHookOptions } from '@apollo/client';
import { useLocalMutation } from '../apollo';
import { Auth } from '../auth';
import { INITIALIZE_MUTATION, CREATE_USER_MUTATION } from './documents';

import { InitializeVariables, CreateUserVariables } from './types';

export const useInitialize = (
  options?: MutationHookOptions<{ initialize: string }, InitializeVariables>
) => useLocalMutation(INITIALIZE_MUTATION, options);

export const useCreateUser = (
  options?: MutationHookOptions<{ createUser: Auth }, CreateUserVariables>
) => useLocalMutation(CREATE_USER_MUTATION, options);
