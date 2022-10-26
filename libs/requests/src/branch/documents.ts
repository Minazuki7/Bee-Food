import { gql } from "@apollo/client";

export const BRANCHS_QUERY = gql`
  query {
    findAllBranchs {
      data {
        franchise {
          name
        }
        name
        openAt
        zone {
          name
        }
        company {
          name
        }
        closeAt
        id
        description
        status
      }
      page
      perPage
      totalPages
      count
    }
  }
`;
export const BRANCHS_BY_ZONE_QUERY = gql`
  query findBranchByZone($id: ID!) {
    findBranchByZone(zone: $id) {
      data {
        franchise {
          name
        }
        name
        openAt
        zone {
          name
        }
        company {
          name
        }
        closeAt
        id
        description
        status
      }
    }
  }
`;
export const BRANCH_QUERY = gql`
  query findBranch($id: ID!) {
    findBranch(id: $id) {
      id
      name
      status
      openAt
      closeAt
      description
      franchise {
        name
      }
      zone {
        name
      }
      company {
        name
      }
    }
  }
`;
export const CREATE_BRANCH_MUTATION = gql`
  mutation createBranch(
    $name: String!
    $zone: ID!
    $franchise: ID!
    $openAt: String!
    $closeAt: String!
    $company: ID!
    $status: Boolean!
    $description: String!
  ) {
    createBranch(
      createBranchInput: {
        name: $name
        zone: $zone
        franchise: $franchise
        openAt: $openAt
        closeAt: $closeAt
        company: $company
        status: $status
        description: $description
      }
    ) {
      id
    }
  }
`;
export const UPDATE_BRANCH_MUTATION = gql`
  mutation updateBranch(
    $id: String!
    $name: String!
    $zone: ID!
    $franchise: ID!
    $openAt: String!
    $closeAt: String!
    $company: ID!
    $status: Boolean!
    $description: String!
  ) {
    updateBranch(
      id: $id
      updateBranchInput: {
        name: $name
        zone: $zone
        franchise: $franchise
        openAt: $openAt
        closeAt: $closeAt
        company: $company
        status: $status
        description: $description
      }
    ) {
      id
    }
  }
`;
export const DELETE_BRANCH_MUTATION = gql`
  mutation removeBranch($id: ID!) {
    removeBranch(id: $id)
  }
`;
