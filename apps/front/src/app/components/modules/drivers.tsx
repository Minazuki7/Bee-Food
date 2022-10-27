import DriverForm from "@components/forms/DriverForm";
import Crud from "@components/ui/Crud/Crud";
import {
  useCreateDriver,
  useLazyDriver,
  useDrivers,
  useDeleteDriver,
  useUpdateDriver,
} from "@requests/driver";
import { RESOURCE } from "@shared/permission";

const Driver = () => (
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
      { title: "company", render: (row) => row.company.name, key: "company" },
      { title: "zone", render: (row) => row.zone.name, key: "zone" },
      { title: "cash", dataIndex: "cash", key: "cash" },

      { title: "wallet", dataIndex: "wallet", key: "wallet" },
      {
        title: " Availability",

        key: "status",
        render: (row) =>
          row.status ? (
            <div className=" text-blue">Avalaibe</div>
          ) : (
            <div className="text-[#FF0000]">not Avalaibe</div>
          ),
      },
      {
        title: " status",
        key: "status",
        render: (row) => (row.status ? "Open" : "Closed"),
      },
    ]}
    list={useDrivers}
    create={useCreateDriver}
    Form={DriverForm}
    get={useLazyDriver}
    update={useUpdateDriver}
    delete={useDeleteDriver}
    formVariant="page"
  />
);

export default Driver;
