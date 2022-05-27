import { gql } from '@apollo/client';

export const ROLES_QUERY = gql`
  query roles($search: String, $page: Int, $perPage: Int) {
    roles(page: $page, perPage: $perPage, search: $search) {
      count
      page
      data {
        id
        name
        permissions {
          resource
          permissions
        }
      }
      perPage
      totalPages
    }
  }
`;

export const ROLE_QUERY = gql`
  query role($id: ID!) {
    role(id: $id) {
      id
      name
      permissions {
        resource
        permissions
      }
    }
  }
`;

export const CREATE_ROLE_MUTATION = gql`
  mutation createRole($name: String!, $permissions: [PermissionInput]!) {
    createRole(name: $name, permissions: $permissions) {
      id
    }
  }
`;

export const UPDATE_ROLE_MUTATION = gql`
  mutation updateRole(
    $id: ID!
    $name: String
    $permissions: [PermissionInput]
  ) {
    updateRole(id: $id, name: $name, permissions: $permissions) {
      id
    }
  }
`;

export const DELETE_ROLE_MUTATION = gql`
  mutation removeRole($id: ID, $ids: [ID]) {
    removeRole(id: $id, ids: $ids)
  }
`;
