import CityForm from "@components/forms/CityForm";
import Crud from "@components/ui/Crud/Crud";
import {
  useCreateCity,
  useLazyCity,
  useCities,
  useDeleteCity,
  useUpdateCity,
} from "@requests/city";
import { RESOURCE } from "@shared/permission";

const City = () => (
  <Crud
    resource={RESOURCE.ANY}
    headers={[
      { title: "name ", dataIndex: "name", key: "name" },
      { title: "country", render: (row) => row.country.name, key: "country" },
    ]}
    list={useCities}
    create={useCreateCity}
    Form={CityForm}
    formVariant="page"
    get={useLazyCity}
    delete={useDeleteCity}
    update={useUpdateCity}
  />
);

export default City;
