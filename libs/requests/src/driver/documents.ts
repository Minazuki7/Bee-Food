import { gql } from "@apollo/client";

export const DRIVERS_QUERY = gql`
  query {
    ActiveDriversAccounts {
      data {
        id
        cash
        firstName
        lastName
        wallet
        phone
        status
        email
        company {
          id
          name
        }
        zone {
          id
          name
        }
      }
      perPage
      totalPages
      count
      page
    }
  }
`;

export const DRIVER_QUERY = gql`
  query findDriver($id: ID!) {
    findDriver(id: $id) {
      id
      cash
      firstName
      lastName
      wallet
      phone
      status
      email
      company {
        name
      }
      zone {
        name
      }
    }
  }
`;

export const CREATE_DRIVER_MUTATION = gql`
  mutation createDriver(
    $firstName: String!
    $lastName: String!
    $phone: String!
    $email: String!
    $company: String!
    $zone: String!
    $password: String!
  ) {
    createDriver(
      zone: $zone
      company: $company
      createUserInput: {
        email: $email
        firstName: $firstName
        lastName: $lastName
        phone: $phone
        role: driver
        password: $password
      }
    ) {
      id
    }
  }
`;

export const UPDATE_DRIVER_MUTATION = gql`
  mutation updateDriver(
    $id: ID!
    $firstName: String
    $lastName: String
    $phone: String
    $email: String
    $company: ID
    $zone: ID
  ) {
    updateDriver(
      id: $id
      UpdateDriverInput: {
        zone: $zone
        company: $company
        email: $email
        firstName: $firstName
        lastName: $lastName
        phone: $phone
      }
    ) {
      id
    }
  }
`;

export const DELETE_DRIVER_MUTATION = gql`
  mutation removeDriver($id: ID!) {
    removeDriver(id: $id)
  }
`;
