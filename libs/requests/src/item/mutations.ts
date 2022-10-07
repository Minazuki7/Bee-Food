import { MutationHookOptions } from "@apollo/client";
import { useLocalMutation } from "../apollo";

import { DeleteVariables } from "../generic";

import {
  CREATE_ITEM_MUTATION,
  UPDATE_ITEM_MUTATION,
  DELETE_ITEM_MUTATION,
} from "./documents";

import { CreateItemVariables, UpdateItemVariables } from "./types";

export const useCreateItem = (
  options?: MutationHookOptions<
    { createItem: { id: string } },
    CreateItemVariables
  >
) => useLocalMutation(CREATE_ITEM_MUTATION, options);

export const useUpdateItem = (
  options?: MutationHookOptions<
    { updateItem: { id: string } },
    UpdateItemVariables
  >
) => useLocalMutation(UPDATE_ITEM_MUTATION, options);

export const useDeleteItem = (
  options?: MutationHookOptions<{ deleteItem: string }, DeleteVariables>
) => useLocalMutation(DELETE_ITEM_MUTATION, options);
