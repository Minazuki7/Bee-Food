import CountryForm from "@components/forms/CountryForm";
import Crud from "@components/ui/Crud/Crud";
import { useUpdateBranch } from "@requests/branch";
import {
  useCreateCountry,
  useLazyCountry,
  useDeleteCountry,
  useUpdateCountry,
  useCountries,
} from "@requests/country";
import { RESOURCE } from "@shared/permission";

const Country = () => (
  <Crud
    resource={RESOURCE.ANY}
    headers={[{ title: "Country ID ", dataIndex: "name", key: "name" }]}
    list={useCountries}
    create={useCreateCountry}
    Form={CountryForm}
    get={useLazyCountry}
    delete={useDeleteCountry}
  />
);

export default Country;
