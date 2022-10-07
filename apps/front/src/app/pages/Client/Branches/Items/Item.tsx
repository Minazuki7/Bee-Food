import Card from "@components/cards/card";
import CartModal from "@components/modals/Cart";

import ConfirmationModal from "@components/modals/confirmation";
import Branch from "@components/modules/branchs";
import { useCreateItem, useItemes, useItemesPerBranch } from "@requests/item/";
import { useMenusPerBranch } from "@requests/menu";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import cart from "../../../../assets/svg/Cart.svg";

interface itemType {
  name: string;
  price: number;
  id: string;
}
const AdminFranchises = () => {
  const navigate = useNavigate();
  const branchName = location.pathname.split("/")[3];
  const branchID = location.search.split("?")[1];
  const { data: itemsData, refetch } = useItemesPerBranch({
    variables: { id: branchID },
  });
  const items = itemsData?.findItemByBranch.data;
  const { data: menusData } = useMenusPerBranch({
    variables: { id: branchID },
  });
  const menus = menusData?.findMenuByBranch.data;
  useEffect(() => {
    refetch();
  }, []);
  const [open, setOpen] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const back = () => {
    navigate("../branches");
  };
  const [newItems, setItems] = useState<itemType[]>([]);
  const [newMenus, setMenus] = useState<itemType[]>([]);

  const [itemNumber, setitemNumber] = useState(0);
  const [currentItem, setCurrentItem] = useState<itemType>();
  const [type, setType] = useState(true);

  const [orderPrice, setorderPrice] = useState(0);

  const addItemToCart = (count: number, item?: itemType) => {
    for (let i = 0; i < count; i++) {
      if (item && type) {
        setItems((oldItems) => [...oldItems, item]);
        setorderPrice((prevCount) => prevCount + item.price);
      }
    }
  };
  const addMenuToCart = (count: number, item?: itemType) => {
    for (let i = 0; i < count; i++) {
      if (item && !type) {
        setMenus((oldItems) => [...oldItems, item]);
        setorderPrice((prevCount) => prevCount + item.price);
      }
    }
  };

  return (
    <div className="w-full">
      <CartModal
        open={openCart}
        items={newItems}
        menus={newMenus}
        branch={branchID}
        price={orderPrice}
        onConfirm={() => {
          setOpenCart(false);
        }}
        onClose={() => {
          setOpenCart(false);
        }}
        onSubmit={() => {
          setOpenCart(false);
        }}
      ></CartModal>
      <ConfirmationModal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        onSubmit={(value) => {
          setOpen(false);
          setitemNumber(value);
          addItemToCart(value, currentItem);
          addMenuToCart(value, currentItem);
        }}
      />
      <div className="flex">
        <button
          onClick={back}
          className="self-start bg-blue hover:bg-indigo-700 justify-start mt-2 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Back
        </button>
        <img
          className=" justify-end ml-auto mb-8"
          src={cart}
          alt="alt"
          width="50"
          height="50 "
          onClick={() => {
            setOpenCart(true);
          }}
        ></img>
      </div>
      <div className=" text-6xl my-4">LIST OF ITEMS</div>

      <div className=" flex justify-end w-full "></div>
      <div className="grid grid-cols-3 gap-1 cursor-pointer">
        {items?.map((item) => (
          <div className=" w-11/12">
            <Card
              id={item.id}
              name={item.title}
              status={item.status}
              price={item.price}
              onClick={() => {
                setOpen(true);
              }}
              onConfirm={(name, price, id) => {
                setCurrentItem({ name, price, id });
                setType(true);
              }}
            />
          </div>
        ))}
      </div>
      <div className=" text-6xl my-4">LIST OF MENUS</div>

      <div className=" flex justify-end w-full "></div>
      <div className="grid grid-cols-3 gap-1 cursor-pointer mt-2">
        {menus?.map((item) => (
          <div className=" w-11/12">
            <Card
              name={item.name}
              status={item.status}
              price={item.price}
              id={item.id}
              onClick={() => {
                setOpen(true);
              }}
              onConfirm={(name, price, id) => {
                setCurrentItem({ name, price, id });
                setType(false);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default AdminFranchises;
