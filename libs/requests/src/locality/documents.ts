import { gql } from '@apollo/client';

export const LOCALITIES_QUERY = gql`
  query localities($page: Int, $perPage: Int, $search: String) {
    localities(page: $page, perPage: $perPage, search: $search) {
      count
      page
      data {
        id
        name
        code
        city {
          name
          code
          governorate {
            name
          }
        }
      }
      perPage
      totalPages
    }
  }
`;
export const LOCALITY_USE_QUERY = gql`
  query locality($id: ID!) {
    locality(id: $id) {
      id
      name
      code
      city {
        id
        name
      }
    }
  }
`;

export const LOCALITY_RENDER_QUERY = gql`
  query locality($id: ID!) {
    locality(id: $id) {
      id
      name
    }
  }
`;

export const CREATE_LOCALITY_MUTATION = gql`
  mutation createLocality($name: String!, $city: ID!, $code: String!) {
    createLocality(name: $name, city: $city, code: $code) {
      id
      name
      code
      city {
        id
      }
    }
  }
`;
export const UPDATE_LOCALITY_MUTATION = gql`
  mutation updateLocality($id: ID!, $name: String, $city: ID!, $code: String) {
    updateLocality(id: $id, name: $name, city: $city, code: $code) {
      id
    }
  }
`;
export const DELETE_LOCALITY_MUTATION = gql`
  mutation removeLocality($id: ID, $ids: [ID]) {
    removeLocality(id: $id, ids: $ids)
  }
`;
