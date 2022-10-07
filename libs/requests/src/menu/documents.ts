import { gql } from "@apollo/client";

export const MENUS_QUERY = gql`
  query {
    findAllMenus {
      data {
        items {
          id
        }
        id
        name
        price
        status
        description
      }
      page
      perPage
      totalPages
      count
    }
  }
`;
export const MENUS_PER_BRANCH_QUERY = gql`
  query findMenuByBranch($id: ID!) {
    findMenuByBranch(branch: $id) {
      data {
        items {
          id
          slug
        }
        id
        name
        price
        status
        description
      }
    }
  }
`;
export const MENU_QUERY = gql`
  query ($id: String!) {
    findMenu(id: $id) {
      items {
        id
      }
      id
      name
      price
      status
      description
    }
  }
`;
export const CREATE_MENU_MUTATION = gql`
  mutation createMenu(
    $name: String!
    $price: Int!
    $description: String!
    $status: Boolean!
    $items: [ID!]!
    $branch: ID!
  ) {
    createMenu(
      createMenuInput: {
        name: $name
        items: $items
        price: $price
        description: $description
        status: $status
        branch: $branch
      }
    ) {
      id
    }
  }
`;
export const UPDATE_MENU_MUTATION = gql`
  mutation updateAdmin($id: ID!, $name: String) {
    updateAdmin(id: $id, name: $name, permissions: $permissions) {
      id
    }
  }
`;
export const DELETE_MENU_MUTATION = gql`
  mutation removeBranch($id: ID!) {
    removeBranch(id: $id)
  }
`;
