import { gql } from "@apollo/client";
import { USER_FRAGMENT } from "../user/fragments";

export const AUTH_FRAGMENT = gql`
  ${USER_FRAGMENT}
  fragment AUTH on AuthResult {
    user {
      ...USER
    }

    token
    refreshToken
    expiresIn
  }
`;
