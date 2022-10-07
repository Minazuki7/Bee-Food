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
import NotFound from "@components/layout/NotFound";
import Owner from "@pages/Owner";
import SuperAdmin from "@pages/SuperAdmin";
import Client from "@pages/Client";

const Dashboard = () => {
  const user = useUser();
  const location = useLocation();
  let to = "";

  if (user?.role === ROLE.ADMIN) to = "/admin/branches";
  else if (user?.role === ROLE.OWNER) to = "/owner/branches";
  else if (user?.role === ROLE.CLIENT) to = "/client/branches";
  else if (user?.role === ROLE.SUPER_ADMIN) to = "/superadmin/franchises";
  else to = "/owner/AddMenu";

  //else if (user?.role === ROLE.CLIENT) to = '/vendor';

  return (
    <Routes>
      <Route path="/admin/*" element={<Admin />} />
      <Route path="/owner/*" element={<Owner />} />
      <Route path="/client/*" element={<Client />} />
      <Route path="/superadmin/*" element={<SuperAdmin />} />

      <Route element={<Navigate replace to={to} />} path="/" />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Dashboard;
