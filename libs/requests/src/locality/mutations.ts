import { MutationHookOptions } from '@apollo/client';
import { useLocalMutation } from '../apollo';
import { DeleteVariables } from '../generic';
import {
  CREATE_LOCALITY_MUTATION,
  UPDATE_LOCALITY_MUTATION,
  DELETE_LOCALITY_MUTATION,
} from './documents';

import { CreateLocalityVariables, UpdateLocalityVariables } from './types';

export const useCreateLocality = (
  options?: MutationHookOptions<
    { createLocality: { id: string } },
    CreateLocalityVariables
  >
) => useLocalMutation(CREATE_LOCALITY_MUTATION, options);

export const useUpdateLocality = (
  options?: MutationHookOptions<
    { updateLocality: { id: string } },
    UpdateLocalityVariables
  >
) => useLocalMutation(UPDATE_LOCALITY_MUTATION, options);

export const useDeleteLocality = (
  options?: MutationHookOptions<{ removeLocality: string }, DeleteVariables>
) => useLocalMutation(DELETE_LOCALITY_MUTATION, options);
