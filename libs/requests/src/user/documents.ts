import { gql } from '@apollo/client';
import { AUTH_FRAGMENT } from '../auth/fragments';

export const INITIALIZE_MUTATION = gql`
  mutation Initialize($type: String!, $ref: String!, $email: String!) {
    initialize(type: $type, ref: $ref, email: $email)
  }
`;

export const CREATE_USER_MUTATION = gql`
  ${AUTH_FRAGMENT}
  mutation CreateUser(
    $token: String!
    $ref: String!
    $username: String!
    $password: String!
    $type: String!
  ) {
    createUser(
      token: $token
      ref: $ref
      username: $username
      password: $password
      type: $type
    ) {
      ...AUTH
    }
  }
`;
