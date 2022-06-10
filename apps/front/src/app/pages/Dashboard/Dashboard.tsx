import useUser from "@hooks/useUser";
import { ROLE } from "@shared/permission";
import {
  matchPath,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import Protected from "@components/layout/Protected";
import Admin from "@pages/Admin";
//import Owner from '@pages/Owner';

import Redirect from "@components/ui/Redirect";

const Dashboard = () => {
  const user = useUser();
  const location = useLocation();
  let to = "";

  //if (user?.role === ROLE.SUPER_ADMIN) to = '/owner';
  if (user?.role === ROLE.ADMIN) to = "/Admin";
  //else if (user?.role === ROLE.CLIENT) to = '/vendor';

  return (
    <Routes>
      <Route path="/Admin/*" element={<Admin />} />

      <Route element={<Navigate replace to={to} />} path="/" />
    </Routes>
  );
};

export default Dashboard;
