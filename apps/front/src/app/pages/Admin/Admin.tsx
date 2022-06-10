import LOGO from "../../assets/png/Rectangle 101.png";
import shoppingBag from "../../assets/svg/shopping-bag.svg";
import branch from "../../assets/svg/BRANCH.svg";
import driver from "../../assets/svg/DRIVER.svg";
import franchise from "../../assets/svg/FRANCHISE.svg";
import client from "../../assets/svg/CLIENTT.svg";
import users from "../../assets/svg/MANGER.svg";
import zone from "../../assets/svg/zone.svg";
import Order from "../../components/modules/orders";

const Admin = () => {
  const items: { name: string; icon: string; url: string }[] = [
    { name: "Orders", icon: shoppingBag, url: "" },
    { name: "Drivers", icon: driver, url: "" },
    { name: "Franchises", icon: franchise, url: "" },
    { name: "Branches", icon: branch, url: "" },
    { name: "Clients", icon: client, url: "" },
    { name: "Users", icon: users, url: "" },
    { name: "Zones", icon: zone, url: "" },
  ];

  return (
    <div className=" flex gap-4 ">
      <div
        className="w-1/5 h-screen shadow-md bg-blue  rounded-r-lg
      px-20"
        id="sidenav"
      >
        <div className="pt-4 pb-2 px-10 py-24 mb-20 mt-10 self-center ">
          <a href="#!">
            <div className="flex items-center">
              <div className="shrink-0">
                <img src={LOGO} alt="alt"></img>
              </div>
            </div>
          </a>
        </div>
        {items.map((items) => (
          <div>
            <ul className="relative px-1 py-5">
              <li className="relative">
                <a
                  className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-white text-text26 whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out"
                  href={items.url}
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="primary"
                >
                  <img src={items.icon} alt="alt"></img>
                  <span>{items.name}</span>
                </a>
              </li>
            </ul>
          </div>
        ))}

        <div className="text-center bottom-0 absolute w-full">
          <p className="py-2 text-sm text-white">food-DilveryⒸ® </p>
        </div>
      </div>
      <div className="bg-baseBlue  left-0 relative rounded-r-4xl bg-cyan flex-2  w-8/12">
        <Order />
      </div>
    </div>
  );
};

export default Admin;
