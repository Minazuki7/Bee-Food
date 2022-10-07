import ItemForm from "@components/forms/ItemForm";
import ItemToMenuForm from "@components/forms/ItemToMenuForm";
import { useLocalMutation } from "@requests/apollo";
import { useCreateBranch } from "@requests/branch";
import { CREATE_ITEM_MUTATION } from "@requests/item";

const AddMenu = () => {
  return (
    <ItemToMenuForm
      onSubmit={() => useCreateBranch}
      onClose={() => undefined}
    />
  );
};
export default AddMenu;
