import { gql } from "@apollo/client";

export const USER_FRAGMENT = gql`
  fragment USER on User {
    id

    email
    role
  }
`;
