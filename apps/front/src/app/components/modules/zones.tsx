import ZoneForm from "@components/forms/ZoneForm";
import Crud from "@components/ui/Crud/Crud";
import { useUpdateBranch } from "@requests/branch";
import {
  useCreateZone,
  useDeleteZone,
  useUpdateZone,
  useZones,
} from "@requests/zone";
import { RESOURCE } from "@shared/permission";

const Zone = () => (
  <Crud
    resource={RESOURCE.ANY}
    headers={[
      { title: "Zone ID ", dataIndex: "name", key: "name" },
      { title: "raduis ", dataIndex: "raduis", key: "raduis" },
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
  />
);

export default Zone;
