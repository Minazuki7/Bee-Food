import localforage from "localforage";
import moment from "moment";
import { FetchResult } from "@apollo/client";

import client, { setToken } from "@config/apollo";

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
    const {
      user,
      token,
      refreshToken,
      expiresIn,
    }: { user: User; token: string; refreshToken: string; expiresIn: string } =
      JSON.parse(authString);
    // if (refreshToken) {
    //   nextData = await client.mutate({
    //     mutation: REFRESH_MUTATION,
    //     variables: { refreshToken: refreshToken, user: user.id },
    //   });
    //   if (nextData.data) {
    //     accessToken = nextData.data.refresh.token;
    //     localforage.setItem("auth", JSON.stringify(nextData.data.refresh));
    //   }
    // } else if (moment(expiresIn, "x").diff(moment(), "minutes") > 0) {
    //   accessToken = token;
    // }

    if (accessToken) {
      setToken(token);
      return user;
    }
    return user;
  } catch (e) {
    return null;
  }
}
