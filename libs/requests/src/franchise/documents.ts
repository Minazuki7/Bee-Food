import { gql } from "@apollo/client";

export const FRANCHISES_QUERY = gql`
  query findAllFranchises {
    findAllFranchises {
      data {
        id
        name
        email
        description
      }
      page
      totalPages
      count
      perPage
    }
  }
`;
export const FRANCHISE_QUERY = gql`
  query findFranchise($id: ID!) {
    findFranchise(id: $id) {
      id
      name
      email
      description
    }
  }
`;
export const CREATE_FRANCHISE_MUTATION = gql`
  mutation createFranchise(
    $name: String!
    $email: String!
    $description: String!
  ) {
    createFranchise(
      createFranchiseInput: {
        name: $name
        email: $email
        description: $description
      }
    ) {
      id
    }
  }
`;
export const UPDATE_FRANCHISE_MUTATION = gql`
  mutation updateFranchise(
    $name: String
    $email: String
    $description: String
    $id: ID!
  ) {
    updateFranchise(
      id: $id
      updateFranchiseInput: {
        name: $name
        email: $email
        description: $description
      }
    ) {
      id
    }
  }
`;
export const DELETE_FRANCHISE_MUTATION = gql`
  mutation removeFranchise($id: ID!) {
    removeFranchise(id: $id)
  }
`;
