import { gql } from '@apollo/client';

export const ZONES_QUERY = gql`
  query zones($page: Int, $perPage: Int) {
    zones(page: $page, perPage: $perPage) {
      count
      page
      data {
        id
        deposit {
          name
          id
        }
        name
        drivers {
          type
          driver {
            firstName
            lastName
            id
          }
        }
        code
        days
        cities {
          name
          id
        }
      }
      perPage
      totalPages
    }
  }
`;

export const DELETE_ZONE_MUTATION = gql`
  mutation removeZone($id: ID, $ids: [ID]) {
    removeZone(id: $id, ids: $ids)
  }
`;

export const ZONE_QUERY = gql`
  query zone($id: ID!) {
    zone(id: $id) {
      id
      deposit {
        id
        name
      }
      name
      drivers {
        type
        driver {
          firstName
          lastName
          id
        }
      }
      code
      days
      cities {
        id
        name
      }
    }
  }
`;

export const CREATE_ZONE_MUTATION = gql`
  mutation createZone(
    $name: String!
    $deposit: ID!
    $code: String!
    $days: [String]!
    $drivers: [ZoneDriversInput]!
    $cities: [ID]
  ) {
    createZone(
      name: $name
      deposit: $deposit
      code: $code
      deposit: $deposit
      drivers: $drivers
      days: $days
      cities: $cities
    ) {
      id
    }
  }
`;

export const UPDATE_ZONE_MUTATION = gql`
  mutation updateZone(
    $id: ID!
    $name: String!
    $deposit: ID!
    $code: String!
    $days: [String]!
    $drivers: [ZoneDriversInput]!
  ) {
    updateZone(
      id: $id
      name: $name
      deposit: $deposit
      code: $code
      deposit: $deposit
      drivers: $drivers
    ) {
      id
    }
  }
`;
