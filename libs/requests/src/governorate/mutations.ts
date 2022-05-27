import { MutationHookOptions } from '@apollo/client';
import { useLocalMutation } from '../apollo';
import { DeleteVariables } from '../generic';
import {
  CREATE_GOVERNORATE_MUTATION,
  UPDATE_GOVERNORATE_MUTATION,
  DELETE_GOVERNORATE_MUTATION,
} from './documents';

import {
  CreateGovernorateVariables,
  UpdateGovernorateVariables,
} from './types';

export const useCreateGovernorate = (
  options?: MutationHookOptions<
    { createGovernorate: { id: string } },
    CreateGovernorateVariables
  >
) => useLocalMutation(CREATE_GOVERNORATE_MUTATION, options);
export const useUpdateGovernorate = (
  options?: MutationHookOptions<
    { useUpdateGovernorate: { id: string } },
    UpdateGovernorateVariables
  >
) => useLocalMutation(UPDATE_GOVERNORATE_MUTATION, options);
export const useDeleteGovernorate = (
  options?: MutationHookOptions<{ deleteGovernorate: string }, DeleteVariables>
) => useLocalMutation(DELETE_GOVERNORATE_MUTATION, options);
