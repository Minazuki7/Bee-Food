import { QueryHookOptions } from "@apollo/client";

import { GetVariables, List, ListVariables } from "../generic";

import { useLocalLazyQuery, useLocalQuery } from "../apollo";
import {
  BRANCHS_BY_ZONE_QUERY,
  BRANCHS_QUERY,
  BRANCH_QUERY,
} from "./documents";
import { Branch } from "./types";

export const useBranches = (
  options?: QueryHookOptions<{ findAllBranchs: List<Branch> }, ListVariables>
) => useLocalQuery(BRANCHS_QUERY, options);

export const useBranchesByZone = (
  options?: QueryHookOptions<{ findBranchByZone: List<Branch> }, GetVariables>
) => useLocalQuery(BRANCHS_BY_ZONE_QUERY, options);

export const useLazyBranch = (
  options?: QueryHookOptions<{ findBranch: Branch }, GetVariables>
) => useLocalLazyQuery(BRANCH_QUERY, options);
