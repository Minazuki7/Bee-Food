import Header from "@components/layout/Header";
import Drawer from "@components/layout/Drawer/Drawer";
import BG from "@assets/png/BG.png";
import useUser from "@hooks/useUser";
import { ROLE } from "@shared/permission";
import LOGO from "@assets/png/logo.png";

const Page: React.FC<any> = ({ children }) => {
  const user = useUser();
  let bg = false;
  if (user?.role === ROLE.CLIENT) {
    bg = true;
  }
  return (
    <div>
      {bg && (
        <div
          className=" h-full min-h-screen"
          style={{
            backgroundImage: `url(
        ${BG}`,
            backgroundSize: "cover",
          }}
        >
          <div className="flex w-max-screen">
            <div className="w-full">
              <div className="flex flex-col   ">
                <div className="flex">
                  <img
                    className=" justify-start"
                    src={LOGO}
                    width="175"
                    height="175"
                  ></img>
                  <div className="mr-8 ml-auto mt-4 flex">
                    <Header />
                  </div>
                </div>
                <div className="flex ml-96">
                  <div className="text-text62 ml-32 mt-auto text-[#622a1e] font-semibold ">
                    {" "}
                    YOUR SATISFACTION OUR DUTY
                  </div>
                </div>
                <main className="w-4/6 px-28 py-28 ml-80">{children}</main>
              </div>
            </div>
          </div>
        </div>
      )}
      {!bg && (
        <div className="flex flex-rows h-full">
          <div className="w-[351px] absolute overflow-auto min-h-screen max-h-screen h-screen">
            <Drawer />
          </div>

          <div className="flex flex-col w-full pl-[352px]">
            <div className="ml-auto">
              <Header />
            </div>
            <main>{children}</main>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
