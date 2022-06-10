import { gql } from "@apollo/client";

export const ORDERS_QUERY = gql`
  query {
    orders {
      data {
        id
        totalPrice
        status
      }
      page
      totalPages
      count
      perPage
    }
  }
`;
export const ORDER_QUERY = gql`
  query ($id: String!) {
    getOrder(id: $id) {
      order {
        id
        items
        branch {
          name
        }
        client {
          firstName
          lastName
        }
        status
        totalPrice
        deliveryFees
      }
      totalPrice
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
// export const UPDATE_ADMIN_MUTATION = gql`
//   mutation updateAdmin(
//     $id: ID!
//     $name: String

//   ) {
//     updateAdmin(id: $id, name: $name, permissions: $permissions) {
//       id
//     }
//   }
// `;
// export const DELETE_ADMIN_MUTATION = gql`
//   mutation removeAdmin($id: ID, $ids: [ID]) {
//     removeAdmin(id: $id, ids: $ids)
//   }
//;
