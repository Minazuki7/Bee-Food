import { gql } from "@apollo/client";

export const STOCKS_QUERY = gql`
  query {
    findAllStocks {
      data {
        items {
          id
          slug
          status
        }
        id
        intial
        rest
      }
      page
      perPage
      totalPages
      count
    }
  }
`;
export const STOCK_QUERY = gql`
  query ($id: String!) {
    findStock(id: $id) {
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
export const CREATE_STOCK_MUTATION = gql`
  mutation createStock(
    $name: String!
    $price: Int!
    $description: String!
    $status: Boolean!
    $items: [ID!]!
    $branch: ID!
  ) {
    createStock(
      createStockInput: {
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
export const UPDATE_STOCK_MUTATION = gql`
  mutation updateAdmin($id: ID!, $name: String) {
    updateAdmin(id: $id, name: $name, permissions: $permissions) {
      id
    }
  }
`;
export const DELETE_STOCK_MUTATION = gql`
  mutation removeBranch($id: ID!) {
    removeBranch(id: $id)
  }
`;
