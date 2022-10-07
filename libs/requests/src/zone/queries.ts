import { QueryHookOptions } from "@apollo/client";
import { useLocalQuery, useLocalLazyQuery } from "../apollo";

import { List, ListVariables, GetVariables } from "../generic";
import { Zone } from "./types";

import { ZONES_QUERY, ZONE_QUERY } from "./documents";

export const useZones = (
  options?: QueryHookOptions<{ findAllZones: List<Zone> }, ListVariables>
) => useLocalQuery(ZONES_QUERY, options);

export const useLazyZone = (
  options?: QueryHookOptions<{ findZone: Zone }, GetVariables>
) => useLocalLazyQuery(ZONE_QUERY, options);
