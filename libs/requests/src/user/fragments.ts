import { gql } from '@apollo/client';

export const USER_FRAGMENT = gql`
  fragment USER on User {
    id
    username
    email
    role
    isActive
    permissions {
      resource
      permissions
    }
    extraFields {
      ... on Company {
        id
        name
        phone
      }
      ... on Vendor {
        id
        name
        phone
        confirmed
        accepted
      }
      ... on Admin {
        id
        firstName
        lastName
      }
    }
  }
`;
