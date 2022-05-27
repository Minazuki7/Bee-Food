import { gql } from '@apollo/client';

export const CITIES_QUERY = gql`
  query cities($page: Int, $perPage: Int, $search: String) {
    cities(page: $page, perPage: $perPage, search: $search) {
      count
      page
      data {
        id
        name
        code
        governorate {
          id
          name
        }
      }
      perPage
      totalPages
    }
  }
`;

export const CITY_QUERY = gql`
  query city($id: ID!) {
    city(id: $id) {
      id
      name
      code
      governorate {
        id
        name
      }
    }
  }
`;

export const CITY_RENDER_QUERY = gql`
  query city($id: ID!) {
    city(id: $id) {
      id
      name
    }
  }
`;

export const CREATE_CITY_MUTATION = gql`
  mutation createCity($name: String!, $governorate: ID!, $code: String!) {
    createCity(name: $name, governorate: $governorate, code: $code) {
      id
    }
  }
`;

export const UPDATE_CITY_MUTATION = gql`
  mutation updateCity(
    $id: ID!
    $name: String
    $governorate: ID
    $code: String
  ) {
    updateCity(id: $id, name: $name, governorate: $governorate, code: $code) {
      id
    }
  }
`;

export const DELETE_CITY_MUTATION = gql`
  mutation removeCity($id: ID, $ids: [ID]) {
    removeCity(id: $id, ids: $ids)
  }
`;
