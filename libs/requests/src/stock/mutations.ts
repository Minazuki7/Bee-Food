import { MutationHookOptions } from "@apollo/client";
import { useLocalMutation } from "../apollo";

import { DeleteVariables } from "../generic";

import {
  CREATE_STOCK_MUTATION,
  UPDATE_STOCK_MUTATION,
  DELETE_STOCK_MUTATION,
} from "./documents";

import { CreateStockVariables, UpdateStockVariables } from "./types";

export const useCreateStock = (
  options?: MutationHookOptions<
    { createStock: { id: string } },
    CreateStockVariables
  >
) => useLocalMutation(CREATE_STOCK_MUTATION, options);

export const useUpdateStock = (
  options?: MutationHookOptions<
    { updateStock: { id: string } },
    UpdateStockVariables
  >
) => useLocalMutation(UPDATE_STOCK_MUTATION, options);

export const useDeleteStock = (
  options?: MutationHookOptions<{ deleteStock: string }, DeleteVariables>
) => useLocalMutation(DELETE_STOCK_MUTATION, options);
