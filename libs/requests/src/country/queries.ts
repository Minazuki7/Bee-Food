import { QueryHookOptions } from "@apollo/client";
import { useLocalLazyQuery, useLocalQuery } from "../apollo";
import { List, ListVariables } from "../generic";

import { Country } from "./types";
import { COUNTRYS_QUERY, COUNTRY_QUERY } from "./documents";

export const useCountries = (
  options?: QueryHookOptions<{ findAllCountrys: List<Country> }, ListVariables>
) => useLocalQuery(COUNTRYS_QUERY, options);

export const useLazyCountry = (
  options?: QueryHookOptions<{ Country: Country }, { id: string }>
) => useLocalLazyQuery(COUNTRY_QUERY, options);
