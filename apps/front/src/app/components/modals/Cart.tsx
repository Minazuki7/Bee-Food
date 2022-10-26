import ModalContainer from "@components/feedback/Modal";

import Close from "@assets/svg/closeOrange.svg";

import { useEffect, useState } from "react";
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
  const [totalPrice, settotalPrice] = useState(0);
  const [itemList, setItems] = useState<any[]>([]);
  const handleChange = (event: any) => {
    setInputValue(event.target.value);
  };
  // let itemsIds: string[] = [];
  // let menuIds: string[] = [];

  const [addOrder, addOrderResponse] = useCreateOrder();
  const [itemsIds, setItemsIds] = useState<string[]>([]);
  const [menusIds, setMenuIds] = useState<string[]>([]);
  const [itemsAdded, setItemsAdded] = useState<any[]>(items);
  const [menusAdded, setMenusAdded] = useState<any[]>(menus);
  // items.map((item) => {
  //   itemsIds.push(item.id);

  //   return;
  // });

  // menus.map((item) => {
  //   menuIds.push(item.id);

  //   return;
  // });
  onSubmit = (values: orderProps) => {
    const [itemsIds, menusIds] = setIdArrys(itemList);

    {
      if (itemsIds.length === 0) {
        addOrder({
          variables: {
            branch: values.branch,
            items: undefined,
            menus: menusIds,
          },
        });
      } else if (menusIds.length === 0) {
        addOrder({
          variables: {
            branch: values.branch,
            items: itemsIds,
            menus: undefined,
          },
        });
      } else {
        addOrder({
          variables: {
            branch: values.branch,
            items: itemsIds,
            menus: menusIds,
          },
        });
      }
    }
    onConfirm();
  };

  let orderVar: orderProps = {
    branch: branch,
    items: itemsIds,
    menus: menusIds,
  };

  const addItems = (
    itemsList: typeof itemsAdded,
    menusList: typeof menusAdded,
    total: number
  ) => {
    let tab: string[] = [];
    let tabItems: any = [];

    // let itemsIdsTemp: string[] = [];
    // let menusIdsTemp: string[] = [];

    itemsList.map((item) => {
      if (!tab.includes(item.id)) {
        tab.push(item.id);
        total += item.price;
        //itemsIdsTemp.push(item.id);
        tabItems.push({
          name: item.name,
          price: item.price,
          occurance: 1,
          id: item.id,
          type: "item",
        });
      } else {
        total += item.price;
        tabItems[tab.indexOf(item.id)].occurance += 1;
      }
    });
    menusList.map((item) => {
      if (!tab.includes(item.id)) {
        tab.push(item.id);
        total += item.price;
        // menusIdsTemp.push(item.id);
        tabItems.push({
          name: item.name,
          price: item.price,
          occurance: 1,
          id: item.id,
          type: "menu",
        });
      } else {
        total += item.price;
        tabItems[tab.indexOf(item.id)].occurance += 1;
      }
    });

    //setItemsIds(itemsIdsTemp);
    //setMenuIds(menusIdsTemp);
    settotalPrice(price);
    setItems(tabItems);
  };
  useEffect(() => {
    addItems(items, menus, totalPrice);
  }, [items, menus]);
  const subCount = (index: number, items: typeof itemList, total: number) => {
    const tab = [...items];

    if (tab[index].occurance > 1) {
      total -= tab[index].price;
      tab[index].occurance = tab[index].occurance - 1;
    } else {
      total -= tab[index].price;
      if (tab[index].type === "item") {
        setItemsAdded(
          itemsAdded.filter((v: any) => {
            return v.id !== tab[index].id;
          })
        );

        console.log("%ctab in fun", "color: #FF0000", items);

        console.log("HERE");
      }
      if (tab[index].type === "menu") {
        setMenusAdded(
          menusAdded.filter((v: any) => {
            return v.id !== tab[index].id;
          })
        );
      }
      tab.splice(index, 1);
    }
    settotalPrice(total);
    setItems(tab);
  };
  const clear = (index: number)=>{
    
  }
  const addCount = (index: number, items: typeof itemList, total: number) => {
    const tab = [...items];
    console.log("%cOG ADDDDDDD", "color:#9a3263", tab[index].price);
    total += tab[index].price;
    tab[index].occurance = tab[index].occurance + 1;
    settotalPrice(total);
    setItems(tab);
  };
  const setIdArrys = (list: typeof itemList) => {
    const itemsList = list
      .filter((item: any) => item.type === "item")
      .map(({ id, occurance }) => {
        return new Array(occurance).fill(id);
      })
      .flat();
    const menusList = list
      .filter((item: any) => item.type === "menu")
      .map(({ id, occurance }) => {
        return new Array(occurance).fill(id);
      })
      .flat();

    return [itemsList, menusList];
  };
  console.log("%cOG TOTAL", "color:#601f3e", totalPrice);
  console.log("%cOG ITEM", "color: #FF0000", items);
  console.log("%cOG MENU", "color: #FF0000", menus);
  console.log("ADDED ITEM", itemsAdded);
  console.log("ADDED MENU", menusAdded);
  console.log("test", itemList);
  console.log("ITEMS", itemsIds);
  console.log("MENUS", menusIds);
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
          Shopping List :
          <table className="m-4 rounded-xl shadow-xl border-1  ">
            <tr className=" h-16 text-[22px] text-black bg-[#CBDEFF] rounded-xl">
              <th className="rounded-tl-xl">Items</th>
              <th className="">QTY</th>
              <th className="">Price</th>
              <th className="rounded-tr-xl">Total Price</th>
            </tr>

            {itemList.map((item, index) => (
              <tr className=" text-center m-6">
                <td className="h-[40px]">{item.name}</td>
                <td className="h-[40px]">
                  <button onClick={() => subCount(index, itemList, totalPrice)}>
                    -
                  </button>
                  {item.occurance}
                  <button onClick={() => addCount(index, itemList, totalPrice)}>
                    +
                  </button>
                </td>
                <td className="h-[40px]">{item.price}</td>
                <td className="h-[40px] mb-4">
                  {" "}
                  {item.price * item.occurance}
                </td>
              </tr>
            ))}
          </table>
          {/* Your Items :
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
          ))} */}
        </ul>
        <div className="text-white text-2xl font-bold justify-end ml-auto m-8">
          Total Items Price : {totalPrice}
        </div>
        <button
          className="bg-white rounded-lg h-12 w-24 my-8"
          onClick={() => {
            onSubmit(orderVar);
          }}
        >
          Submit
        </button>
      </div>
    </ModalContainer>
  );
};

export default CartModal;
