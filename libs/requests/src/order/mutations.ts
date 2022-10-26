import { MutationHookOptions } from "@apollo/client";
import { useLocalMutation } from "../apollo";

import { DeleteVariables } from "../generic";

import {
  CREATE_ORDER_MUTATION,
  UPDATE_ORDER_MUTATION,
  //DELETE_ORDER_MUTATION,
} from "./documents";

import { CreateOrderVariables, UpdateOrderVariables } from "./types";

export const useCreateOrder = (
  options?: MutationHookOptions<
    { createOrder: { id: string } },
    CreateOrderVariables
  >
) => useLocalMutation(CREATE_ORDER_MUTATION, options);

export const useUpdateOrder = (
  options?: MutationHookOptions<
    { updateOrder: { id: string } },
    UpdateOrderVariables
  >
) => useLocalMutation(UPDATE_ORDER_MUTATION, options);

// export const useDeleteOrder = (
//   options?: MutationHookOptions<{ deleteOrder: string }, DeleteVariables>
// ) => useLocalMutation(DELETE_ORDER_MUTATION, options);
