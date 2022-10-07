import Crud from "@components/ui/Crud/Crud";
import { useLazyClient, useClients } from "@requests/client";
import { RESOURCE } from "@shared/permission";

const Client = () => (
  <Crud
    resource={RESOURCE.ANY}
    headers={[
      {
        title: "name",
        render: (row) => row.firstName + " " + row.lastName,
        key: "name",
      },
      { title: "email", dataIndex: "email", key: "email" },
      { title: "Phone Number", dataIndex: "phone", key: "phone" },
      //{ title: "zone", render: (row) => row.zone.name, key: "zone" },
    ]}
    list={useClients}
    get={useLazyClient}
    formVariant="page"
  />
);

export default Client;
