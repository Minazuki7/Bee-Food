import ClientForm from "@components/forms/ClientForm";
import Branch from "@components/modules/branchs";
import { useCreateItem } from "@requests/item";
const AdminBranches = () => {
  return (
    <div>
      <ClientForm onSubmit={() => useCreateItem} onClose={() => undefined} />
    </div>
  );
};
export default AdminBranches;
