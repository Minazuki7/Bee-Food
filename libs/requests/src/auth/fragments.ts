import { gql } from '@apollo/client';
import { USER_FRAGMENT } from '../user/fragments';

export const AUTH_FRAGMENT = gql`
  ${USER_FRAGMENT}
  fragment AUTH on Auth {
    user {
      ...USER
    }
    token {
      tokenType
      accessToken
      refreshToken
      expiresIn
    }
  }
`;
