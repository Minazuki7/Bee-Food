import { gql } from '@apollo/client';

export const ADMINS_QUERY = gql`
  query admins($page: Int, $perPage: Int) {
    admins(page: $page, perPage: $perPage) {
      count
      page
      data {
        id
        firstName
        lastName
        address
        roles {
          name
        }
        user {
          id
          username
        }
      }
      perPage
      totalPages
    }
  }
`;
export const ADMIN_QUERY = gql`
  query admin($id: ID!) {
    admin(id: $id) {
      id
      name
      permissions {
        resource
        permissions
      }
    }
  }
`;
export const CREATE_ADMIN_MUTATION = gql`
  mutation createAdmin(
    $firstName: String!
    $lastName: String!
    $address: String!
    $roles: [ID]
    $accessibility: [PermissionInput]
  ) {
    createAdmin(
      firstName: $firstName
      lastName: $lastName
      address: $address
      roles: $roles
      accessibility: $accessibility
    ) {
      id
    }
  }
`;
export const UPDATE_ADMIN_MUTATION = gql`
  mutation updateAdmin(
    $id: ID!
    $name: String
    $permissions: [PermissionInput]
  ) {
    updateAdmin(id: $id, name: $name, permissions: $permissions) {
      id
    }
  }
`;
export const DELETE_ADMIN_MUTATION = gql`
  mutation removeAdmin($id: ID, $ids: [ID]) {
    removeAdmin(id: $id, ids: $ids)
  }
`;
