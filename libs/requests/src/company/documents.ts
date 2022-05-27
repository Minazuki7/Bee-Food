import { gql } from '@apollo/client';

export const COMPANIES_QUERY = gql`
  query companies($page: Int, $perPage: Int) {
    companies(page: $page, perPage: $perPage) {
      count
      page
      data {
        id
        phone
        name
        address
      }
      perPage
      totalPages
    }
  }
`;

export const COMPANY_QUERY = gql`
  query company($id: ID!) {
    company(id: $id) {
      id
      name
      phone
      address
    }
  }
`;

export const CREATE_COMPANY_MUTATION = gql`
  mutation createCompany(
    $name: String!
    $phone: String!
    $address: String
    $isActive: Boolean!
  ) {
    createCompany(
      name: $name
      phone: $phone
      address: $address
      isActive: $isActive
    ) {
      id
    }
  }
`;

export const UPDATE_COMPANY_MUTATION = gql`
  mutation updateCompany(
    $id: ID!
    $name: String
    $phone: string
    $address: string
  ) {
    updateCompany(id: $id, name: $name, phone: $phone, address: $address) {
      id
    }
  }
`;

export const DELETE_COMPANY_MUTATION = gql`
  mutation removeCompany($id: ID, $ids: [ID]) {
    removeCompany(id: $id, ids: $ids)
  }
`;
