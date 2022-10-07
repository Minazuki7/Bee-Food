import Card from "@components/cards/card";
import Branch from "@components/modules/branchs";
import { useMenus } from "@requests/menu/";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const AdminFranchises = () => {
  const { data: compnayData, refetch } = useMenus();
  const items = compnayData?.findAllMenus.data;
  useEffect(() => {
    refetch();
  }, [items]);

  return (
    <div className="w-full">
      <div className=" text-6xl">LIST OF MENUS</div>

      <div className=" flex justify-end w-full ">
        <Link
          className=" my-4 py-2 mr-8 px-2 bg-blue-500  text-white  bg-blue font-bold  rounded focus:outline-none focus:shadow-outline"
          to="../AddMenu"
        >
          + Add a new{" "}
          {location.pathname
            .split("/")[2]
            .slice(0, location.pathname.split("/")[2].length - 1)}
        </Link>
      </div>
      <div className="grid grid-cols-4 gap-1">
        {items?.map((item) => (
          <div className=" w-11/12">
            <Card
              name={item.name}
              status={item.status}
              price={item.price}
              id={item.id}
              onClick={() => undefined}
              onConfirm={() => undefined}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default AdminFranchises;
