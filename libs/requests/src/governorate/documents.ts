import { gql } from '@apollo/client';

export const GOVERNORATES_QUERY = gql`
  query governorates($page: Int, $perPage: Int, $search: String) {
    governorates(page: $page, perPage: $perPage, search: $search) {
      count
      page
      data {
        id
        name
      }
      perPage
      totalPages
    }
  }
`;

export const GOVERNORATE_USE_QUERY = gql`
  query governorate($id: ID!) {
    governorate(id: $id) {
      id
      name
    }
  }
`;

export const CREATE_GOVERNORATE_MUTATION = gql`
  mutation createGovernorate($name: String!) {
    createGovernorate(name: $name) {
      id
      name
    }
  }
`;

export const UPDATE_GOVERNORATE_MUTATION = gql`
  mutation updateGovernorate($id: ID!, $name: String) {
    updateGovernorate(id: $id, name: $name) {
      id
    }
  }
`;

export const DELETE_GOVERNORATE_MUTATION = gql`
  mutation removeGovernorate($id: ID, $ids: [ID]) {
    removeGovernorate(id: $id, ids: $ids)
  }
`;
