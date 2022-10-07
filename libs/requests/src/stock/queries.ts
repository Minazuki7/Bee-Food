import { QueryHookOptions } from "@apollo/client";

import { GetVariables, List, ListVariables } from "../generic";

import { useLocalLazyQuery, useLocalQuery } from "../apollo";
import { STOCKS_QUERY, STOCK_QUERY } from "./documents";
import { Stock } from "./types";

export const useStockes = (
  options?: QueryHookOptions<{ findAllStocks: List<Stock> }, ListVariables>
) => useLocalQuery(STOCKS_QUERY, options);

export const useLazyStock = (
  options?: QueryHookOptions<{ findStock: Stock }, GetVariables>
) => useLocalLazyQuery(STOCK_QUERY, options);
