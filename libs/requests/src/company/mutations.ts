import { MutationHookOptions } from '@apollo/client';
import { useLocalMutation } from '../apollo';

import { DeleteVariables } from '../generic';
import { CreateCompanyVariables, UpdateCompanyVariables } from './types';

import {
  CREATE_COMPANY_MUTATION,
  UPDATE_COMPANY_MUTATION,
  DELETE_COMPANY_MUTATION,
} from './documents';

export const useCreateCompany = (
  options?: MutationHookOptions<
    { createCompany: { id: string } },
    CreateCompanyVariables
  >
) => useLocalMutation(CREATE_COMPANY_MUTATION, options);

export const useUpdateCompany = (
  options?: MutationHookOptions<
    { updateCompany: { id: string } },
    UpdateCompanyVariables
  >
) => useLocalMutation(UPDATE_COMPANY_MUTATION, options);

export const useDeleteCompany = (
  options?: MutationHookOptions<{ deleteCompany: string }, DeleteVariables>
) => useLocalMutation(DELETE_COMPANY_MUTATION, options);
