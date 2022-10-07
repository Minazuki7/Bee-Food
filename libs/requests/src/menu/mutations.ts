import { MutationHookOptions } from "@apollo/client";
import { useLocalMutation } from "../apollo";

import { DeleteVariables } from "../generic";

import {
  CREATE_MENU_MUTATION,
  UPDATE_MENU_MUTATION,
  DELETE_MENU_MUTATION,
} from "./documents";

import { CreateMenuVariables, UpdateMenuVariables } from "./types";

export const useCreateMenu = (
  options?: MutationHookOptions<
    { createMenu: { id: string } },
    CreateMenuVariables
  >
) => useLocalMutation(CREATE_MENU_MUTATION, options);

export const useUpdateMenu = (
  options?: MutationHookOptions<
    { updateMenu: { id: string } },
    UpdateMenuVariables
  >
) => useLocalMutation(UPDATE_MENU_MUTATION, options);

export const useDeleteMenu = (
  options?: MutationHookOptions<{ deleteMenu: string }, DeleteVariables>
) => useLocalMutation(DELETE_MENU_MUTATION, options);
