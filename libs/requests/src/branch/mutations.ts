import { MutationHookOptions } from "@apollo/client";
import { useLocalMutation } from "../apollo";

import { DeleteVariables } from "../generic";

import {
  CREATE_BRANCH_MUTATION,
  UPDATE_BRANCH_MUTATION,
  DELETE_BRANCH_MUTATION,
} from "./documents";

import { CreateBranchVariables, UpdateBranchVariables } from "./types";

export const useCreateBranch = (
  options?: MutationHookOptions<
    { createBranch: { id: string } },
    CreateBranchVariables
  >
) => useLocalMutation(CREATE_BRANCH_MUTATION, options);

export const useUpdateBranch = (
  options?: MutationHookOptions<
    { updateBranch: { id: string } },
    UpdateBranchVariables
  >
) => useLocalMutation(UPDATE_BRANCH_MUTATION, options);

export const useDeleteBranch = (
  options?: MutationHookOptions<{ deleteBranch: string }, DeleteVariables>
) => useLocalMutation(DELETE_BRANCH_MUTATION, options);
