import { gql } from '@apollo/client';

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
  query clients($page: Int, $perPage: Int) {
    clients(page: $page, perPage: $perPage) {
      count
      page
      data {
        id
        firstName
        lastName
        phone
        locality {
          name
          city {
            name
            code
            governorate {
              name
            }
          }
        }
      }
      perPage
      totalPages
    }
  }
`;

export const CLIENT_QUERY = gql`
  query client($id: ID!) {
    client(id: $id) {
      id
      firstName
      lastName
      phone
      locality {
        id
        name
        city {
          id
          name
          code
          governorate {
            id
            name
          }
        }
      }
    }
  }
`;

export const CREATE_CLIENT_MUTATION = gql`
  mutation CreateClient(
    $firstName: String!
    $lastName: String!
    $locality: String!
    $phone: String!
  ) {
    createClient(
      firstName: $firstName
      lastName: $lastName
      locality: $locality
      phone: $phone
    ) {
      id
    }
  }
`;
