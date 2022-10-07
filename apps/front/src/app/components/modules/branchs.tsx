import BranchForm from "@components/forms/BranchForm";
import Crud from "@components/ui/Crud/Crud";
import {
  useCreateBranch,
  useLazyBranch,
  useBranches,
  useDeleteBranch,
  useUpdateBranch,
} from "@requests/branch";
import { RESOURCE } from "@shared/permission";

const Branch = () => (
  <Crud
    resource={RESOURCE.ANY}
    headers={[
      {
        title: "franchise",
        render: (row) => row.franchise.name,
        key: "franchise",
      },
      { title: " name", dataIndex: "name", key: "name" },

      { title: "description", dataIndex: "description", key: "description" },
      { title: "zone", render: (row) => row.zone.name, key: "zone" },
      { title: "company", render: (row) => row.company.name, key: "company" },
      { title: " Open At", dataIndex: "openAt", key: "openAt" },
      { title: " Close at", dataIndex: "closeAt", key: "closeAt" },
      {
        title: " status",
        key: "status",
        render: (row) => (row.status ? "Open" : "Closed"),
      },
    ]}
    list={useBranches}
    create={useCreateBranch}
    Form={BranchForm}
    formVariant="page"
    get={useLazyBranch}
    delete={useDeleteBranch}
    update={useUpdateBranch}
  />
);

export default Branch;
