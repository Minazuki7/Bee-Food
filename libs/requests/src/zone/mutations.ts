import { MutationHookOptions } from '@apollo/client';
import { useLocalMutation } from '../apollo';
import { DeleteVariables } from '../generic';
import {
  DELETE_ZONE_MUTATION,
  CREATE_ZONE_MUTATION,
  UPDATE_ZONE_MUTATION,
} from './documents';

import { CreateZoneVariables, UpdateZoneVariables } from './types';

export const useCreateZone = (
  options?: MutationHookOptions<
    { createZone: { id: string } },
    CreateZoneVariables
  >
) => useLocalMutation(CREATE_ZONE_MUTATION, options);

export const useUpdateZone = (
  options?: MutationHookOptions<
    { updateZone: { id: string } },
    UpdateZoneVariables
  >
) => useLocalMutation(UPDATE_ZONE_MUTATION, options);

export const useDeleteZone = (
  options?: MutationHookOptions<{ removeZone: string }, DeleteVariables>
) => useLocalMutation(DELETE_ZONE_MUTATION, options);
