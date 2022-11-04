import { QueryHookOptions } from "@apollo/client";

import { GetVariables, List, ListVariables } from "../generic";

import { useLocalLazyQuery, useLocalQuery } from "../apollo";
import { ORDERS_QUERY, ORDER_QUERY, ORDER_STATS_QUERY } from "./documents";
import { Order } from "./types";

export const useOrders = (
  options?: QueryHookOptions<{ findAllOrders: List<Order> }, ListVariables>
) => useLocalQuery(ORDERS_QUERY, options);

export const useOrderStats = (
  options?: QueryHookOptions<{ getStats: any }, ListVariables>
) => useLocalQuery(ORDER_STATS_QUERY, options);

export const useLazyOrder = (
  options?: QueryHookOptions<{ findOrders: Order }, GetVariables>
) => useLocalLazyQuery(ORDER_QUERY, options);
