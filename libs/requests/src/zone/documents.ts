import { gql } from "@apollo/client";

export const ZONES_QUERY = gql`
  query findAlZones($pagination: PaginationArgs) {
    findAllZones(pagination: $pagination) {
      count
      page
      data {
        id
        name
        raduis
        city {
          name
          id
          country {
            name
          }
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
  query findZone($id: ID!) {
    findZone(id: $id) {
      id
      name
      raduis
      city {
        name
        id
        country {
          name
        }
      }
    }
  }
`;

export const CREATE_ZONE_MUTATION = gql`
  mutation createZone($name: String!, $city: ID!, $raduis: Int!) {
    createZone(createZoneInput: { name: $name, city: $city, raduis: $raduis }) {
      id
    }
  }
`;

export const UPDATE_ZONE_MUTATION = gql`
  mutation updateZone($id: ID!, $name: String!, $city: ID!, $raduis: Int!) {
    updateZone(id: $id, name: $name, city: $city, raduis: $raduis) {
      id
    }
  }
`;
