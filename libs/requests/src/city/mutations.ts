import { MutationHookOptions } from '@apollo/client';
import { useLocalMutation } from '../apollo';

import { DeleteVariables } from '../generic';
import { CreateCityVariables, UpdateCityVariables } from './types';

import {
  CREATE_CITY_MUTATION,
  UPDATE_CITY_MUTATION,
  DELETE_CITY_MUTATION,
} from './documents';

export const useCreateCity = (
  options?: MutationHookOptions<
    { createCity: { id: string } },
    CreateCityVariables
  >
) => useLocalMutation(CREATE_CITY_MUTATION, options);

export const useUpdateCity = (
  options?: MutationHookOptions<
    { updateCity: { id: string } },
    UpdateCityVariables
  >
) => useLocalMutation(UPDATE_CITY_MUTATION, options);

export const useDeleteCity = (
  options?: MutationHookOptions<{ removeCity: string }, DeleteVariables>
) => useLocalMutation(DELETE_CITY_MUTATION, options);
