import { QueryHookOptions } from "@apollo/client";

import { GetVariables, List, ListVariables } from "../generic";

import { useLocalLazyQuery, useLocalQuery } from "../apollo";
import { FRANCHISES_QUERY, FRANCHISE_QUERY } from "./documents";
import { Franchise } from "./types";

export const useFranchises = (
  options?: QueryHookOptions<
    { findAllFranchises: List<Franchise> },
    ListVariables
  >
) => useLocalQuery(FRANCHISES_QUERY, options);

export const useLazyFranchise = (
  options?: QueryHookOptions<{ franchise: Franchise }, GetVariables>
) => useLocalLazyQuery(FRANCHISE_QUERY, options);
