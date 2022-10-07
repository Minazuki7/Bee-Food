import { QueryHookOptions } from "@apollo/client";

import { GetVariables, List, ListVariables } from "../generic";

import { useLocalLazyQuery, useLocalQuery } from "../apollo";
import { ITEMS_PER_BRANCH_QUERY, ITEMS_QUERY, ITEM_QUERY } from "./documents";
import { Item } from "./types";

export const useItemes = (
  options?: QueryHookOptions<{ findAllItems: List<Item> }, ListVariables>
) => useLocalQuery(ITEMS_QUERY, options);

export const useItemesPerBranch = (
  options?: QueryHookOptions<{ findItemByBranch: List<Item> }, GetVariables>
) => useLocalQuery(ITEMS_PER_BRANCH_QUERY, options);

export const useLazyItem = (
  options?: QueryHookOptions<{ findItem: Item }, GetVariables>
) => useLocalLazyQuery(ITEM_QUERY, options);
