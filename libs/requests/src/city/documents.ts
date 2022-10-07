import { gql } from "@apollo/client";

export const CITIES_QUERY = gql`
  query {
    findAllCitys {
      page
      perPage
      totalPages
      count
      data {
        id
        name
        country {
          id
          name
        }
      }
    }
  }
`;

export const CITY_QUERY = gql`
  query city($id: ID!) {
    findCity(id: $id) {
      id
      name

      country {
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
      country
    }
  }
`;

export const CREATE_CITY_MUTATION = gql`
  mutation createCity($name: String!, $country: ID!) {
    createCity(createCityInput: { name: $name, country: $country }) {
      id
    }
  }
`;

export const UPDATE_CITY_MUTATION = gql`
  mutation updateCity($id: ID!, $name: String, $country: ID) {
    updateCity(id: $id, updateCityInput: { name: $name, country: $country }) {
      id
    }
  }
`;

export const DELETE_CITY_MUTATION = gql`
  mutation removeCity($id: ID!) {
    removeCity(id: $id)
  }
`;
