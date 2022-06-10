import { useContext, useEffect } from "react";
import { MutationHookOptions, MutationTuple } from "@apollo/client";
import localforage from "localforage";
import { setToken } from "@config/apollo";
import { Auth } from "@requests/auth";
import { graphQLResult } from "@utils/graphql";
import AuthContext from "@contexts/AuthContext";

function useAuth<Arguments, Result extends Record<string, Auth>>(
  fn: (
    options?: MutationHookOptions<Result, Arguments>
  ) => MutationTuple<Result, Arguments>,
  stayConnected = true
): MutationTuple<Result, Arguments> {
  const { setUser } = useContext(AuthContext);
  const [call, state] = fn({ fetchPolicy: "network-only" });

  function persistUser(data: Auth) {
    const result = { ...data };
    if (!stayConnected) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      delete result.token;
    }
    localforage.setItem("auth", JSON.stringify(result));
  }

  useEffect(() => {
    if (state.data) {
      const result = graphQLResult(state.data);
      setToken(result.token);
      persistUser(result);
      setUser(result.user);
    }
    // eslint-disable-next-line
  }, [state.data]);

  return [call, state];
}

export default useAuth;
