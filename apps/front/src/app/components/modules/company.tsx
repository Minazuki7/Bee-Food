import CompanyForm from "@components/forms/CompanyForm";
import Crud from "@components/ui/Crud/Crud";
import { useUpdateBranch } from "@requests/branch";
import {
  useCreateCompany,
  useLazyCompany,
  useDeleteCompany,
  useUpdateCompany,
  useCompanies,
} from "@requests/company";
import { RESOURCE } from "@shared/permission";

const Company = () => (
  <Crud
    resource={RESOURCE.ANY}
    headers={[
      { title: "Company ID ", dataIndex: "name", key: "name" },
      { title: "email", dataIndex: "email", key: "email" },
      { title: "description", dataIndex: "description", key: "description" },
      {
        title: "Delivery Fee",
        render: (row) => row.deliveryFee + "Dt ",
        key: "Delivery Fee",
      },
    ]}
    list={useCompanies}
    create={useCreateCompany}
    Form={CompanyForm}
    get={useLazyCompany}
    delete={useDeleteCompany}
    update={useUpdateCompany}
  />
);

export default Company;
