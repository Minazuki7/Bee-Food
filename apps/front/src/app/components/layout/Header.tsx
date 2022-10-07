import useLogout from "@hooks/useLogout";

import { ReactComponent as UserLogo } from "@assets/svg/user-logo.svg";
import { ReactComponent as Bell } from "@assets/svg/bell.svg";
import { ReactComponent as Logout } from "@assets/svg/Logout.svg";
import Search from "@components/inputs/Search";
import useUser from "@hooks/useUser";
import { ROLE } from "@shared/permission";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const user = useUser();
  const logout = useLogout();
  const navigate = useNavigate();
  return (
    <header className="text-trueblack ">
      <div className="flex font-bold items-center text-xl  gap-4 my-4">
        <UserLogo />
        {!(user?.role === ROLE.CLIENT) && (
          <div className="flex gap-2 items-center">
            {user?.email}
            <div className="cursor-pointer" onClick={logout}>
              <Logout />
            </div>
          </div>
        )}
        {user?.role === ROLE.CLIENT && (
          <div className="flex gap-2  cursor-pointer  ">
            <div onClick={() => navigate("../Register")}> {user?.email}</div>
            <div onClick={logout}>
              <Logout />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
