import ZoneForm from "@components/forms/ZoneForm";
import Crud from "@components/ui/Crud/Crud";
import { useUpdateBranch } from "@requests/branch";
import {
  useCreateZone,
  useDeleteZone,
  useLazyZone,
  useUpdateZone,
  useZones,
} from "@requests/zone";
import { RESOURCE } from "@shared/permission";

const Zone = () => (
  <Crud
    resource={RESOURCE.ANY}
    headers={[
      { title: "Zone ID ", dataIndex: "name", key: "name" },
      { title: "raduis ", render: (row) => row.raduis + "Km", key: "raduis" },
      { title: "city", render: (row) => row.city.name, key: "city" },
      {
        title: "country",
        render: (row) => row.city.country.name,
        key: "country",
      },
    ]}
    list={useZones}
    create={useCreateZone}
    Form={ZoneForm}
    update={useUpdateZone}
    delete={useDeleteZone}
    formVariant="page"
    get={useLazyZone}
  />
);

export default Zone;
