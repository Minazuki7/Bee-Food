import useUser from "@hooks/useUser";
import { RESOURCE, ROLE } from "@shared/permission";

import Logo from "@assets/svg/orange-logo.svg";

import { ReactComponent as Dashboard } from "@assets/svg/dashboard.svg";
import { ReactComponent as Sending } from "@assets/svg/sending.svg";
import { ReactComponent as Ticket } from "@assets/svg/ticket.svg";
import { ReactComponent as Finance } from "@assets/svg/finance.svg";
import { ReactComponent as Client } from "@assets/svg/client.svg";
import { ReactComponent as UserLogo } from "@assets/svg/user-logo.svg";
import shoppingBag from "@assets/svg/shopping-bag.svg";
import branch from "@assets/svg/BRANCH.svg";
import driver from "@assets/svg/DRIVER.svg";
import franchise from "@assets/svg/FRANCHISE.svg";
import client from "@assets/svg/CLIENTT.svg";
import users from "@assets/svg/MANGER.svg";
import zone from "@assets/svg/zone.svg";
import LOGO from "@assets/png/logo.png";
import BG from "@assets/png/BGFOOD.png";
import BranchAlt from "@assets/svg/BranchAlt.svg";
import ClientAlt from "@assets/svg/ClientAlt.svg";
import DriverAlt from "@assets/svg/DriverAlt.svg";
import FranchiseAlt from "@assets/svg/FranchiseAlt.svg";
import OrderAlt from "@assets/svg/OrderAlt.svg";
import UserAlt from "@assets/svg/UserAlt.svg";
import ZoneAlt from "@assets/svg/ZoneAlt.svg";
import Items from "@assets/svg/ITEMS.svg";
import ItemsAlt from "@assets/svg/ITEMSAlt.svg";
import Menus from "@assets/svg/MENUS.svg";
import MenusAlt from "@assets/svg/MENUSAlt.svg";
import classNames from "classnames";
import { Link } from "react-router-dom";
import DrawerItem, { DrawerItemProps } from "./DrawerItem";
import useLogout from "@hooks/useLogout";
import Company from "@assets/svg/Company.svg";
import CompanyAlt from "@assets/svg/CompanyAlt.svg";
import Country from "@assets/svg/Country.svg";
import CountryAlt from "@assets/svg/CountryAlt.svg";
import City from "@assets/svg/City.svg";
import CityAlt from "@assets/svg/CityAlt.svg";

export const superadminResources = [
  { name: "Companies", icon: Company, iconAlt: CompanyAlt, path: "Companies" },
  {
    name: "Franchises",
    icon: franchise,
    iconAlt: FranchiseAlt,
    path: "franchises",
  },
  { name: "Countries", icon: Country, iconAlt: CountryAlt, path: "Countries" },
  { name: "Cities", icon: City, iconAlt: CityAlt, path: "Cities" },
  { name: "Zones", icon: zone, iconAlt: ZoneAlt, path: "zones" },
  // { name: "Users", icon: users, iconAlt: UserAlt, path: "users" },
];

export const adminResources = [
  { name: "Orders", icon: shoppingBag, iconAlt: OrderAlt, path: "orders" },
  { name: "Drivers", icon: driver, iconAlt: DriverAlt, path: "drivers" },
  {
    name: "Franchises",
    icon: franchise,
    iconAlt: FranchiseAlt,
    path: "franchises",
  },
  { name: "Branches", icon: branch, iconAlt: BranchAlt, path: "branches" },
  { name: "Clients", icon: client, iconAlt: ClientAlt, path: "clients" },
  // { name: "Users", icon: users, iconAlt: UserAlt, path: "users" },
  { name: "Zones", icon: zone, iconAlt: ZoneAlt, path: "zones" },
];
export const restoResources = [
  { name: "Branches", icon: branch, iconAlt: BranchAlt, path: "branches" },
  { name: "Orders", icon: shoppingBag, iconAlt: OrderAlt, path: "orders" },
  { name: "Items", icon: Items, iconAlt: ItemsAlt, path: "items" },
  {
    name: "Menus",
    icon: Menus,
    iconAlt: MenusAlt,
    path: "menus",
  },

  { name: "Clients", icon: client, iconAlt: ClientAlt, path: "clients" },
  // { name: "Users", icon: users, iconAlt: UserAlt, path: "users" },
];
// export const adminResources = [
//   { title: "Orders", resource: RESOURCE.ORDER, path: "orders" },
//   { title: "Drivers", resource: RESOURCE.DRIVER, path: "Drivers" },
//   { title: "Franchises", resource: RESOURCE.FRANCHISE, path: "Franchises" },
//   { title: "Branches", resource: RESOURCE.BRANCH, path: "Branches" },
//   { title: "Clients", resource: RESOURCE.CLIENT, path: "clients" },
//   { title: "Users", resource: RESOURCE.USER, path: "Users" },
//   { title: "Zones", resource: RESOURCE.CITY, path: "zones" },
// ];

export const ownerResources = [
  { title: "Clients", path: "clients" },
  {
    title: "Gouvernorats",
    path: "governorates",
  },
  { title: "Villes", path: "cities" },
  {
    title: "Localités",
    path: "localities",
  },
];

export interface DrawerItem extends DrawerItemProps {
  resource?: RESOURCE;
  show?: boolean;
}

const Drawer = ({ show = false }) => {
  const user = useUser();
  let role = "";
  let items: { name: string; icon: string; path: string; iconAlt: string }[] =
    [];
  //let items = [] as DrawerItem[];
  if (user?.role === ROLE.ADMIN) {
    items = adminResources;
    role = "/admin/";
    show = true;
  } else if (user?.role === ROLE.OWNER) {
    items = restoResources;
    role = "/owner/";
    show = true;
  } else if (user?.role === ROLE.SUPER_ADMIN) {
    items = superadminResources;
    role = "/super-admin/";
    show = true;
  }
  const logout = useLogout();

  return (
    <div>
      {show && (
        <aside className=" flex gap-4 fixed  max-h-screen ">
          <div
            className=" shadow-md bg-blue  rounded-r-lg  z-0 flex-2 w-[351px] h-screen"
            id="sidenav"
          >
            <div className="pt-4 pb-2   mb-20 mt-10 w-full flex justify-center ">
              <a href="#!">
                <div className="shrink-0">
                  <img src={LOGO} alt="alt" width="175" height="175 "></img>
                </div>
              </a>
            </div>
            <div className="pl-16">
              {items.map((items) => {
                const path = role + items.path === location.pathname;
                return (
                  <div
                    className={classNames(path ? "bg-white rounded-l-2xl" : "")}
                  >
                    <ul className="  py-5">
                      {/* <a
                    className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-white text-text26 whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out"
                    href={items.path}
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="primary"
                  > */}

                      <Link to={items.path}>
                        <li
                          className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-white text-text26 whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out"
                          data-mdb-ripple="true"
                          data-mdb-ripple-color="primary"
                        >
                          <img
                            className="w-[40px] "
                            src={path ? items.iconAlt : items.icon}
                            alt="alt"
                          ></img>
                          <div
                            className={classNames(
                              path ? "text-trueblack ml-8" : "ml-8"
                            )}
                          >
                            {" "}
                            {items.name}
                          </div>
                        </li>
                      </Link>
                      {/* </a> */}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
          {/* <div
        className="text-trueblack h-header w-100   flex  top-10 right-0 z-20 ml-[1650px] flex-1 "
        onClick={logout}
      >
        <UserLogo />

        <div className="flex flex-col"> {user?.email}</div>
      </div> */}

          {/* {items.map((item) => {
        if (
          item.resource &&
          !user?.permissions.find(
            (p) => p.resource === RESOURCE.ANY || p.resource === item.resource
          )
        ) {
          return null;
        }

        // return <DrawerItem key={item.title} {...item} />;
        return <div>NOUR</div>;
      })} */}
        </aside>
      )}
    </div>
  );
};

export default Drawer;
