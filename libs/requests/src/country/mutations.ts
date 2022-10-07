import { MutationHookOptions } from "@apollo/client";
import { DeleteVariables } from "../generic";
import { useLocalMutation } from "../apollo";

import { CreateCountryVariables, UpdateCountryVariables } from "./types";
import {
  DELETE_COUNTRY_MUTATION,
  CREATE_COUNTRY_MUTATION,
  UPDATE_COUNTRY_MUTATION,
} from "./documents";

export const useCreateCountry = (
  options?: MutationHookOptions<
    { updateCountry: { id: string } },
    CreateCountryVariables
  >
) => useLocalMutation(CREATE_COUNTRY_MUTATION, options);

export const useUpdateCountry = (
  options?: MutationHookOptions<
    { updateCountry: { id: string } },
    UpdateCountryVariables
  >
) => useLocalMutation(UPDATE_COUNTRY_MUTATION, options);

export const useDeleteCountry = (
  options?: MutationHookOptions<{ deleteCountry: string }, DeleteVariables>
) => useLocalMutation(DELETE_COUNTRY_MUTATION, options);
