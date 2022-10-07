import { MutationHookOptions } from "@apollo/client";
import { DeleteVariables } from "../generic";
import { useLocalMutation } from "../apollo";

import { CreateClientVariables, UpdateClientVariables } from "../client/types";
import {
  DELETE_CLIENT_MUTATION,
  CREATE_CLIENT_MUTATION,
  UPDATE_CLIENT_MUTATION,
} from "../client/documents";

export const useCreateClient = (
  options?: MutationHookOptions<
    { updateClient: { id: string } },
    CreateClientVariables
  >
) => useLocalMutation(CREATE_CLIENT_MUTATION, options);

export const useUpdateClient = (
  options?: MutationHookOptions<
    { updateClient: { id: string } },
    UpdateClientVariables
  >
) => useLocalMutation(UPDATE_CLIENT_MUTATION, options);

export const useDeleteClient = (
  options?: MutationHookOptions<{ deleteClient: string }, DeleteVariables>
) => useLocalMutation(DELETE_CLIENT_MUTATION, options);
