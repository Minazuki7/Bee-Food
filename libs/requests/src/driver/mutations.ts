import { MutationHookOptions } from '@apollo/client';
import { DeleteVariables } from '../generic';
import { useLocalMutation } from '../apollo';

import { CreateDriverVariables, UpdateDriverVariables } from './types';
import {
  DELETE_DRIVER_MUTATION,
  CREATE_DRIVER_MUTATION,
  UPDATE_DRIVER_MUTATION,
} from './documents';

export const useCreateDriver = (
  options?: MutationHookOptions<
    { updateDriver: { id: string } },
    CreateDriverVariables
  >
) => useLocalMutation(CREATE_DRIVER_MUTATION, options);

export const useUpdateDriver = (
  options?: MutationHookOptions<
    { updateDriver: { id: string } },
    UpdateDriverVariables
  >
) => useLocalMutation(UPDATE_DRIVER_MUTATION, options);

export const useDeleteDriver = (
  options?: MutationHookOptions<{ deleteDriver: string }, DeleteVariables>
) => useLocalMutation(DELETE_DRIVER_MUTATION, options);
