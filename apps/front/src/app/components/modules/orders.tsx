import Crud from "@components/ui/Crud/Crud";
import { useCreateOrder, useLazyOrder, useOrders } from "@requests/order";
import { RESOURCE } from "@shared/permission";

const Order = () => (
  <Crud
    resource={RESOURCE.ANY}
    headers={[
      // { title: "Customer", dataIndex: "client", key: "client" },
      { title: "Restaurant", render: (row) => row.branch.name, key: "branch" },
      //{ title: "Driver", dataIndex: "driver", key: "driver" },
      { title: "Total", dataIndex: "totalPrice", key: "totalPrice" },
      { title: "Delivery satuts", dataIndex: "status", key: "status" },
    ]}
    list={useOrders}
    create={useCreateOrder}
    //Form={OrderForm}
    get={useLazyOrder}
    formVariant="page"
  />
);

export default Order;
