import OrderForm from "@components/forms/OrderDetails";
import Crud from "@components/ui/Crud/Crud";
import {
  useCreateOrder,
  useLazyOrder,
  useOrders,
  useUpdateOrder,
} from "@requests/order";
import { RESOURCE } from "@shared/permission";

const Order = () => (
  <Crud
    resource={RESOURCE.ANY}
    headers={[
      {
        title: "ID",
        render: (row) => row.id.substring(17),
        key: "ID",
      },
      { title: "Restaurant", render: (row) => row.branch.name, key: "branch" },
      {
        title: "Client",
        render: (row) => row.client.firstName + " " + row.client.lastName,
        key: "client",
      },
      //{ title: "Driver", dataIndex: "driver", key: "driver" },
      { title: "Total", dataIndex: "totalPrice", key: "totalPrice" },
      { title: "Delivery satuts", dataIndex: "status", key: "status" },
    ]}
    list={useOrders}
    create={useCreateOrder}
    update={useUpdateOrder}
    Form={OrderForm}
    get={useLazyOrder}
    formVariant="page"
  />
);

export default Order;
