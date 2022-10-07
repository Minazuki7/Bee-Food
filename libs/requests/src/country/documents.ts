import { gql } from "@apollo/client";

export const COUNTRYS_QUERY = gql`
  query {
    findAllCountrys {
      data {
        id
        name
      }
    }
  }
`;

export const COUNTRY_QUERY = gql`
  query findCountry($id: ID!) {
    findCountry(id: $id) {
      id
      name
    }
  }
`;

export const CREATE_COUNTRY_MUTATION = gql`
  mutation createCountry($name: String!) {
    createCountry(createCountryInput: { name: $name }) {
      id
    }
  }
`;

export const UPDATE_COUNTRY_MUTATION = gql`
  mutation updateCountry($name: String!, $id: ID!) {
    updateCountry(updateCountryInput: { name: $name }, id: $id) {
      id
    }
  }
`;

export const DELETE_COUNTRY_MUTATION = gql`
  mutation removeCountry($id: ID!) {
    removeCountry(id: $id)
  }
`;
