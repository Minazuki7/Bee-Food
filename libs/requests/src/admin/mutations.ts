import { MutationHookOptions } from '@apollo/client';
import { useLocalMutation } from '../apollo';

import { DeleteVariables } from '../generic';

import {
  CREATE_ADMIN_MUTATION,
  UPDATE_ADMIN_MUTATION,
  DELETE_ADMIN_MUTATION,
} from './documents';

import { CreateAdminVariables, UpdateAdminVariables } from './types';

export const useCreateAdmin = (
  options?: MutationHookOptions<
    { createAdmin: { id: string } },
    CreateAdminVariables
  >
) => useLocalMutation(CREATE_ADMIN_MUTATION, options);

export const useUpdateAdmin = (
  options?: MutationHookOptions<
    { updateAdmin: { id: string } },
    UpdateAdminVariables
  >
) => useLocalMutation(UPDATE_ADMIN_MUTATION, options);

export const useDeleteAdmin = (
  options?: MutationHookOptions<{ deleteAdmin: string }, DeleteVariables>
) => useLocalMutation(DELETE_ADMIN_MUTATION, options);
