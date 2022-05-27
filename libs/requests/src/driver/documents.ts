import { gql } from '@apollo/client';

export const DRIVERS_QUERY = gql`
  query drivers($page: Int, $perPage: Int) {
    drivers(page: $page, perPage: $perPage) {
      count
      page
      data {
        id
        code
        firstName
        lastName
        address
        phone
        truck {
          id
          matricule
        }
        city
        transportMode
        profitMargin
        ratePackage
      }
      perPage
      totalPages
    }
  }
`;

export const DRIVER_QUERY = gql`
  query driver($id: ID!) {
    driver(id: $id) {
      id
      code
      firstName
      lastName
      address
      phone
      truck {
        id
        matricule
      }
      city
      transportMode
      profitMargin
      ratePackage
    }
  }
`;

export const CREATE_DRIVER_MUTATION = gql`
  mutation createDriver(
    $code: String!
    $firstName: String!
    $lastName: String!
    $address: String!
    $phone: [String]!
    $transportMode: String!
    $profitMargin: String!
    $ratePackage: String!
    $truck: ID!
    $city: String!
  ) {
    createDriver(
      code: $code
      firstName: $firstName
      lastName: $lastName
      address: $address
      phone: $phone
      truck: $truck
      city: $city
      transportMode: $transportMode
      profitMargin: $profitMargin
      ratePackage: $ratePackage
    ) {
      id
    }
  }
`;

export const UPDATE_DRIVER_MUTATION = gql`
  mutation updateDriver(
    $id: ID!
    $code: String
    $firstName: String
    $lastName: String
    $address: String
    $phone: [String]
    $transportMode: String
    $profitMargin: String
    $ratePackage: String
    $truck: ID
    $city: String
  ) {
    updateDriver(
      id: $id
      code: $code
      firstName: $firstName
      lastName: $lastName
      address: $address
      phone: $phone
      truck: $truck
      city: $city
      transportMode: $transportMode
      profitMargin: $profitMargin
      ratePackage: $ratePackage
    ) {
      id
    }
  }
`;

export const DELETE_DRIVER_MUTATION = gql`
  mutation removeDriver($id: ID, $ids: [ID]) {
    removeDriver(id: $id, ids: $ids)
  }
`;
