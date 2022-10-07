import { gql } from "@apollo/client";

export const COMPANIES_QUERY = gql`
  query {
    findAllCompanys {
      count
      page
      data {
        id
        name
        email
        description
        deliveryFee
      }
      perPage
      totalPages
    }
  }
`;

export const COMPANY_QUERY = gql`
  query company($id: ID!) {
    findCompany(id: $id) {
      id
      name
      email
      description
      deliveryFee
    }
  }
`;

export const CREATE_COMPANY_MUTATION = gql`
  mutation createCompany(
    $name: String!
    $email: String!
    $description: String!
    $deliveryFee: Int!
  ) {
    createCompany(
      createCompanyInput: {
        name: $name
        email: $email
        description: $description
        deliveryFee: $deliveryFee
      }
    ) {
      id
    }
  }
`;

export const UPDATE_COMPANY_MUTATION = gql`
  mutation updateCompany(
    $id: String!
    $name: String!
    $email: String!
    $description: String!
    $deliveryFee: Int!
  ) {
    updateCompany(
      id: $id
      updateCompanyInput: {
        name: $name
        email: $email
        description: $description
        deliveryFee: $deliveryFee
      }
    ) {
      id
    }
  }
`;

export const DELETE_COMPANY_MUTATION = gql`
  mutation removeCompany($id: ID!) {
    removeCompany(id: $id)
  }
`;
