import FranchiseForm from "@components/forms/FranchiseFrom";
import Crud from "@components/ui/Crud/Crud";
import {
  useCreateFranchise,
  useLazyFranchise,
  useFranchises,
  useDeleteFranchise,
  useUpdateFranchise,
} from "@requests/franchise";
import { RESOURCE } from "@shared/permission";

const Franchise = () => (
  <Crud
    resource={RESOURCE.ANY}
    headers={[
      { title: "Franchise ID ", dataIndex: "name", key: "name" },
      { title: "email", dataIndex: "email", key: "email" },
      { title: "description", dataIndex: "description", key: "description" },
    ]}
    list={useFranchises}
    create={useCreateFranchise}
    Form={FranchiseForm}
    get={useLazyFranchise}
    delete={useDeleteFranchise}
    update={useUpdateFranchise}
    formVariant="page"
  />
);

export default Franchise;
