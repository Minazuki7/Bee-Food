import { MutationHookOptions } from "@apollo/client";
import { useLocalMutation } from "../apollo";

import { DeleteVariables } from "../generic";

import {
  CREATE_FRANCHISE_MUTATION,
  UPDATE_FRANCHISE_MUTATION,
  DELETE_FRANCHISE_MUTATION,
} from "./documents";

import { CreateFranchiseVariables, UpdateFranchiseVariables } from "./types";

export const useCreateFranchise = (
  options?: MutationHookOptions<
    { createFranchise: { id: string } },
    CreateFranchiseVariables
  >
) => useLocalMutation(CREATE_FRANCHISE_MUTATION, options);

export const useUpdateFranchise = (
  options?: MutationHookOptions<
    { updateFranchise: { id: string } },
    UpdateFranchiseVariables
  >
) => useLocalMutation(UPDATE_FRANCHISE_MUTATION, options);

export const useDeleteFranchise = (
  options?: MutationHookOptions<{ deleteFranchise: string }, DeleteVariables>
) => useLocalMutation(DELETE_FRANCHISE_MUTATION, options);
