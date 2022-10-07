import { gql } from "@apollo/client";

export const CLIENTS_SEARCH_QUERY = gql`
  query clients($page: Int, $perPage: Int) {
    clients(page: $page, perPage: $perPage) {
      data {
        id
        firstName
        lastName
      }
    }
  }
`;

export const CLIENTS_QUERY = gql`
  query {
    findAllClients {
      count
      page
      data {
        id
        email
        firstName
        lastName
        phone
      }

      perPage
      totalPages
    }
  }
`;

export const CLIENT_QUERY = gql`
  query client($id: ID!) {
    findClient(id: $id) {
      id
      firstName
      lastName
      phone
      email
    }
  }
`;

export const CREATE_CLIENT_MUTATION = gql`
  mutation createClient(
    $firstName: String!
    $lastName: String!
    $phone: String!
    $email: String!
    $password: String!
  ) {
    createClient(
      createUserInput: {
        email: $email
        firstName: $firstName
        lastName: $lastName
        phone: $phone
        role: client
        password: $password
      }
    ) {
      id
    }
  }
`;

export const UPDATE_CLIENT_MUTATION = gql`
  mutation updateClient(
    $id: ID!
    $firstName: String!
    $lastName: String!
    $phone: String!
    $email: String!
  ) {
    updateClient(
      id: $id
      updateClientInput: {
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

export const DELETE_CLIENT_MUTATION = gql`
  mutation removeClient($id: ID!) {
    removeClient(id: $id)
  }
`;
export const GET_CLIENT = gql`
  query findClientByUserID($id: ID!) {
    findClientByUserID(id: $id) {
      id
    }
  }
`;
