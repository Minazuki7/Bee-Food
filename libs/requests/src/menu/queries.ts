import { QueryHookOptions } from "@apollo/client";

import { GetVariables, List, ListVariables } from "../generic";

import { useLocalLazyQuery, useLocalQuery } from "../apollo";
import { MENUS_PER_BRANCH_QUERY, MENUS_QUERY, MENU_QUERY } from "./documents";
import { Menu } from "./types";

export const useMenus = (
  options?: QueryHookOptions<{ findAllMenus: List<Menu> }, ListVariables>
) => useLocalQuery(MENUS_QUERY, options);

export const useMenusPerBranch = (
  options?: QueryHookOptions<{ findMenuByBranch: List<Menu> }, GetVariables>
) => useLocalQuery(MENUS_PER_BRANCH_QUERY, options);

export const useLazyMenu = (
  options?: QueryHookOptions<{ findMenu: Menu }, GetVariables>
) => useLocalLazyQuery(MENU_QUERY, options);
