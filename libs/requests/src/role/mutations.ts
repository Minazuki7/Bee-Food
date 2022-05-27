import { MutationHookOptions } from '@apollo/client';
import { useLocalMutation } from '../apollo';
import { DeleteVariables } from '../generic';
import {
  CREATE_ROLE_MUTATION,
  UPDATE_ROLE_MUTATION,
  DELETE_ROLE_MUTATION,
} from './documents';

import { CreateRoleVariables, UpdateRoleVariables } from './types';

export const useCreateRole = (
  options?: MutationHookOptions<
    { createRole: { id: string } },
    CreateRoleVariables
  >
) => useLocalMutation(CREATE_ROLE_MUTATION, options);

export const useUpdateRole = (
  options?: MutationHookOptions<
    { updateRole: { id: string } },
    UpdateRoleVariables
  >
) => useLocalMutation(UPDATE_ROLE_MUTATION, options);

export const useDeleteRole = (
  options?: MutationHookOptions<{ deleteRole: string }, DeleteVariables>
) => useLocalMutation(DELETE_ROLE_MUTATION, options);
