import { gql } from "@apollo/client";

export const ITEMS_QUERY = gql`
  query {
    findAllItems {
      data {
        id
        slug
        title
        price
        status
        foodType
        description
      }
      page
      perPage
      totalPages
      count
    }
  }
`;
export const ITEMS_PER_BRANCH_QUERY = gql`
  query findItemByBranch($id: ID!) {
    findItemByBranch(branch: $id) {
      data {
        id
        status
        title
        slug
        description
        price
        branch {
          company {
            deliveryFee
          }
        }
      }
    }
  }
`;
export const ITEM_QUERY = gql`
  query ($id: String!) {
    findItem(id: $id) {
      id
      slug
      title
      price
      status
      foodType
      description
    }
  }
`;
export const CREATE_ITEM_MUTATION = gql`
  mutation createItem(
    $slug: String!
    $title: String!
    $price: Int!
    $description: String!
    $status: Boolean!
    $branch: ID!
    $stock: Float!
  ) {
    createItem(
      createItemInput: {
        slug: $slug
        title: $title
        price: $price
        foodType: food
        description: $description
        status: $status
        branch: $branch
      }
      stock: $stock
    ) {
      id
    }
  }
`;
export const UPDATE_ITEM_MUTATION = gql`
  mutation updateAdmin($id: ID!, $name: String) {
    updateAdmin(id: $id, name: $name, permissions: $permissions) {
      id
    }
  }
`;
export const DELETE_ITEM_MUTATION = gql`
  mutation removeBranch($id: ID!) {
    removeBranch(id: $id)
  }
`;
