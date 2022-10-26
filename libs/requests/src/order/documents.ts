import { gql } from "@apollo/client";

export const ORDERS_QUERY = gql`
  query {
    findAllOrders {
      data {
        id
        totalPrice
        status
        client {
          firstName
          lastName
        }
        branch {
          name
        }
      }
      page
      totalPages
      count
      perPage
    }
  }
`;
export const ORDER_QUERY = gql`
  query ($id: ID!) {
    findOrder(id: $id) {
      id
      totalPrice
      deliveryFees
      price
      status
      client {
        firstName
        lastName
      }
      branch {
        name
        zone {
          name
        }
      }
      company {
        name
      }
      items {
        id
        title
        price
        description
      }
      menus {
        id
        name
        price
        description
      }
    }
  }
`;
export const CREATE_ORDER_MUTATION = gql`
  mutation createOrder($branch: ID!, $items: [ID!], $menus: [ID!]) {
    createOrder(
      createOrderInput: { branch: $branch, items: $items, menus: $menus }
    ) {
      id
    }
  }
`;
export const UPDATE_ORDER_MUTATION = gql`
  mutation updateFranchise(
    $name: String
    $email: String
    $description: String
    $id: ID!
  ) {
    updateFranchise(
      id: $id
      updateFranchiseInput: {
        name: $name
        email: $email
        description: $description
      }
    ) {
      id
    }
  }
`;
// export const DELETE_ADMIN_MUTATION = gql`
//   mutation removeAdmin($id: ID, $ids: [ID]) {
//     removeAdmin(id: $id, ids: $ids)
//   }
//;
