import localforage from "localforage";
import moment from "moment";
import { FetchResult } from "@apollo/client";

import client, { setToken } from "@config/apollo";
import { Token } from "@requests/auth/types";
import { User } from "@requests/user/types";
import { REFRESH_MUTATION } from "@requests/auth/documents";
import { Auth } from "@requests/auth/types";

export default async function startup(): Promise<User | null> {
  try {
    const authString = await localforage.getItem<string | null>("auth");
    let nextData:
      | FetchResult<
          {
            refresh: Auth;
          },
          Record<string, unknown>,
          Record<string, unknown>
        >
      | undefined;
    let accessToken = null;
    if (!authString) {
      return null;
    }
    const { user, token }: { user: User; token: Token } =
      JSON.parse(authString);
    if (token.refreshToken) {
      nextData = await client.mutate({
        mutation: REFRESH_MUTATION,
        variables: { refreshToken: token.refreshToken, user: user.id },
      });
      if (nextData.data) {
        accessToken = nextData.data.refresh.token.accessToken;
        localforage.setItem("auth", JSON.stringify(nextData.data.refresh));
      }
    } else if (moment(token.expiresIn, "x").diff(moment(), "minutes") > 0) {
      accessToken = token.accessToken;
    }

    if (accessToken) {
      setToken(token);
      return user;
    }
    return null;
  } catch (e) {
    return null;
  }
}
