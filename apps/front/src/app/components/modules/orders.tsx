import Crud from "@components/ui/Crud/Crud";
import { useCreateOrder, useLazyOrder, useOrders } from "@requests/order";
import { RESOURCE } from "@shared/permission";

const Order = () => (
  <Crud
    resource={RESOURCE.ANY}
    headers={[
      { title: "Order ID ", dataIndex: "id", key: "id" },
      { title: "Customer", dataIndex: "client", key: "client" },
      { title: "Restaurant", dataIndex: "branch", key: "branch" },
      { title: "Driver", dataIndex: "driver", key: "driver" },
      { title: "Total", dataIndex: "totalPrice", key: "totalPrice" },
      { title: "Delivery satuts", dataIndex: "status", key: "status" },
    ]}
    list={useOrders}
    create={useCreateOrder}
    //Form={OrderForm}
    get={useLazyOrder}
  />
);

export default Order;
