import ItemForm from "@components/forms/ItemForm";
import { useLocalMutation } from "@requests/apollo";
import { useCreateBranch } from "@requests/branch";
import { CREATE_ITEM_MUTATION, useCreateItem } from "@requests/item";

const AddItem = () => {
  return <ItemForm onSubmit={() => useCreateItem} onClose={() => undefined} />;
};
export default AddItem;
