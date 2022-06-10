import { gql } from "@apollo/client";
import { USER_FRAGMENT } from "../user/fragments";
import { AUTH_FRAGMENT } from "./fragments";

export const LOGIN_MUTATION = gql`
  ${AUTH_FRAGMENT}
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ...AUTH
    }
  }
`;

export const REGISTER_MUTATION = gql`
  ${AUTH_FRAGMENT}
  mutation register(
    $username: String!
    $password: String!
    $phone: String!
    $email: String!
    $company: ID!
  ) {
    register(
      username: $username
      password: $password
      phone: $phone
      email: $email
      company: $company
    ) {
      ...AUTH
    }
  }
`;

export const REFRESH_MUTATION = gql`
  ${AUTH_FRAGMENT}
  mutation refresh($refreshToken: String!, $user: String!) {
    refresh(refreshToken: $refreshToken, user: $user) {
      ...AUTH
    }
  }
`;

export const LOGOUT_MUTATION = gql`
  mutation logout($refreshToken: String!) {
    logout(refreshToken: $refreshToken)
  }
`;

export const CONFIRM_MUTATION = gql`
  ${USER_FRAGMENT}
  mutation confirm($code: String!) {
    confirm(code: $code) {
      ...USER
    }
  }
`;

export const RESEND_MUTATION = gql`
  mutation resend {
    resend
  }
`;

export const FORGOT_MUTATION = gql`
  mutation Forgot($email: String!) {
    forgot(email: $email)
  }
`;

export const RESET_MUTATION = gql`
  ${AUTH_FRAGMENT}
  mutation Reset($password: String!, $token: String!, $user: String!) {
    reset(password: $password, token: $token, user: $user) {
      ...AUTH
    }
  }
`;
