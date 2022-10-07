import { gql } from "@apollo/client";

export const ORDERS_QUERY = gql`
  query {
    findAllOrders {
      data {
        id
        totalPrice
        status

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
      items
      status
      price
      totalPrice
      deliveryFees
      branch {
        name
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
