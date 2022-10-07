import ModalContainer from "@components/feedback/Modal";

import Close from "@assets/svg/closeOrange.svg";

import { useState } from "react";
import { CreateOrderVariables, useCreateOrder } from "@requests/order";
import { values } from "lodash";

interface itemType {
  name: string;
  price: number;
  id: string;
}
interface ItemShopType {
  name: string;
  price: number;
}

interface orderProps {
  branch: string;
  items?: string[];
  menus?: string[];
}

interface PropsModal {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onSubmit: (values: CreateOrderVariables) => void;
  items: itemType[];
  menus: itemType[];
  branch: string;
  price: number;
}
const CartModal = ({
  open,
  onClose,
  onSubmit,
  onConfirm,
  items,
  menus,
  branch,
  price,
}: PropsModal) => {
  const [input, setInputValue] = useState(1);

  const handleChange = (event: any) => {
    setInputValue(event.target.value);
  };
  let itemsIds: string[] = [];
  let menuIds: string[] = [];

  const [addOrder, addOrderResponse] = useCreateOrder();

  items.map((item) => {
    itemsIds.push(item.id);

    return;
  });

  menus.map((item) => {
    menuIds.push(item.id);

    return;
  });
  onSubmit = (values: orderProps) => {
    addOrder({
      variables: {
        branch: values.branch,
        items: values.items,
        menus: values.menus,
      },
    });
    onConfirm();
  };
  let orderVar: orderProps = {
    branch: branch,
    items: itemsIds,
    menus: menuIds,
  };

  return (
    <ModalContainer
      open={open}
      classNameContainer=" w-2/6 "
      contentClasses="py-0"
      color={true}
      client={true}
    >
      <div className="flex flex-col items-center px-4 py-6 absolute right-0 t-20 cursor-pointer z-20 ">
        <img src={Close} alt="Close" width={20} height={20} onClick={onClose} />
        *
      </div>
      <div className="h-full w-full relative flex flex-col items-center">
        <div className="text-white text-4xl font-bold m-8"> Your Cart </div>
        <ul className="text-white text-2xl font-bold items-center text-center m-8">
          Your Items :
          {items.map((item) => (
            <li className="m-6">
              {item.name} → Price : {item.price}
            </li>
          ))}
        </ul>
        <ul className="text-white text-2xl font-bold items-center text-center m-8 ">
          Your Menus :
          {menus.map((item) => (
            <li className="m-6">
              {item.name} → Price : {item.price}
            </li>
          ))}
        </ul>
        <div className="text-white text-2xl font-bold justify-end ml-auto m-8">
          Total Items Price : {price}
        </div>
        <button
          className="bg-white rounded-lg h-12 w-24 my-8"
          onClick={() => {
            onSubmit(orderVar);
          }}
        >
          Submit
        </button>

        <div onClick={onClose} className=" text-[#623b1e]">
          {" "}
          AAAAAAAAAAAAAAAAAAAAAAAA
        </div>
      </div>
    </ModalContainer>
  );
};

export default CartModal;
